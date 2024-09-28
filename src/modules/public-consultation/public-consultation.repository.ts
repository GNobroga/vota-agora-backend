import Paginator from "src/core/models/Paginator";
import { IPublicConsultationRepository } from "./interfaces/public-consultation-repository.interface";
import PublicConsultation from "./schemas/public-consultation.schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export default class PublicConsultationRepository implements IPublicConsultationRepository {
    
    constructor(
        @InjectModel(PublicConsultation.name)
        private readonly _model: Model<PublicConsultation>
    ) {}
    
    async save(record: PublicConsultation): Promise<boolean> {
        try {
            if (record['_id']) {
                const id = record['_id'] as string;
                await this._model.findByIdAndUpdate(id, record ,{  new: true }).exec();
                return true;
           } else {
                await this._model.create(record);
                return true;
           }
        } catch {
            return false;
        }
    }

    async findById(identifier: string): Promise<PublicConsultation> {
        try {
            const data = await this._model.findById(identifier).exec();
            return data.toObject();
        } catch {
            return null;
        }
    }


    async deleteById(identifier: string): Promise<boolean> {
       try {
            this.findById(identifier);
            await this._model.findByIdAndDelete(identifier).exec();
            return true;
       } catch {
            return false;
       }
    }

    async findAll(paginator: Paginator): Promise<PublicConsultation[]> {
        const skip = (paginator.page - 1) * paginator.size; 
        const data = await this._model.find()
            .sort({ '_id': paginator.sort === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(paginator.size)
            .populate('owner');
        return data.map(doc => doc.toObject());
    }
    
}