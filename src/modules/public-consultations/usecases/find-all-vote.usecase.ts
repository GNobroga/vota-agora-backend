import IDefaultUseCase from "src/core/usecases/default.usecase";
import { Repository } from "typeorm";
import Vote from "../entities/vote.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

interface Input {
    loggedUserId: number;
}

export interface Output {
    rewardTokenAcquired: string;
    publicConsultationName: string;
    date: Date;
    received: boolean;
}

@Injectable()
export default class FindAllVoteUseCase implements IDefaultUseCase<Input, Output[]> {

    constructor(
        @InjectRepository(Vote)
        readonly voteRepository: Repository<Vote>,
    ) {}
    async execute({ loggedUserId }: Input): Promise<Output[]> {
       const votes = await this.voteRepository.find({
         where: { user: { id: loggedUserId, }},
         relations: {
            publicConsultation: true,
         },
         order: {
            createdAt: 'DESC',
         },
       });

       return votes.map(({ publicConsultation, rewardTokenAcquired, createdAt, received }) => {
            return {
                rewardTokenAcquired: rewardTokenAcquired.toString(),
                publicConsultationName: publicConsultation.title,
                date: createdAt,
                received,
            };
       })
    }

}