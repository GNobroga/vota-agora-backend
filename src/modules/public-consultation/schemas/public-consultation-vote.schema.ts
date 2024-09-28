import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import PublicConsultation from "./public-consultation.schema";
import { User } from "src/modules/users/user.schema";

@Schema({
    collection: 'public_consultation_vote',
})
export default class PublicConsultationVote {

    @Prop({ type: Types.ObjectId, ref: PublicConsultation.name })
    publicConsultation: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: Types.ObjectId;
}

export const PublicConsultationVoteSchema = SchemaFactory.createForClass(PublicConsultationVote);

