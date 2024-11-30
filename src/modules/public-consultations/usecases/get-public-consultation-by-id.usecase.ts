import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import IDefaultUseCase from "src/core/usecases/default.usecase";
import BlockchainService from "src/infrastructure/services/blockchain.service";
import { Repository } from "typeorm";
import PublicConsultation from "../entities/public-consultation.entity";
import Vote from "../entities/vote.entity";


interface Input {
    targetId: number;
    loggedUserId: number;
    accountAddress: string;
}

type Output = {
    id: number;
    title: string;
    ownerName: string;
    imageUrl?: string;
    description: string;
    initialDate: Date;
    endDate: Date;
    category: string;
    status: 'open' | 'closed';
    voted?: boolean;
    owner?: boolean;
    createdAt: Date;
    countParticipants: number;
}

@Injectable()
export default class GetPublicConsultationByIdUseCase implements IDefaultUseCase<Input, Output> {
    constructor(
        @InjectRepository(PublicConsultation)
        readonly repository: Repository<PublicConsultation>,
        @InjectRepository(Vote)
        readonly voteRepository: Repository<Vote>,
        private _blockchainService: BlockchainService,
    ) {}

    async execute({ targetId, loggedUserId, accountAddress,  }: Input): Promise<Output> {
        const entity = await this.repository.findOne({
            where: { id: targetId, },
            relations: {
                owner: true,
            },
        });
        if (!entity) { 
            throw new NotFoundException(`Consulta pública com id ${entity.id} não encontrada.`);
        }

        const countParticipants = await this.voteRepository.countBy({
            publicConsultation: {
                id: entity.id,
            },
            received: false,
        });

        return {
            ...entity,
            ownerName: entity.owner.fullName,
            owner: loggedUserId === entity.owner.id,
            voted: await this._blockchainService.hasVoted(accountAddress, entity.id),
            countParticipants,
        }
    }
}