import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../users/user.schema';

@Schema({ collection: 'public_consultation' })
export default class PublicConsultation {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop()
  initialDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId | User;

  @Prop()
  endDate: Date;

  constructor(props: Partial<PublicConsultation>) {
    this.title = props?.title ?? this.title;
    this.description = props?.description ?? this.description;
    this.initialDate = props?.initialDate ?? this.initialDate;
    this.endDate = props?.endDate ?? this.endDate;
    this.imageUrl = props?.imageUrl ?? this.imageUrl;
    this.owner = props?.owner ?? this.owner;
  }

  static create(
    owner: Types.ObjectId,
    title: string,
    description: string,
    initialDate: Date,
    endDate: Date,
  ) {
    return new PublicConsultation({
      title,
      description,
      initialDate,
      endDate,
      owner,
    });
  }

  static update(
    title: string,
    description: string,
    imageUrl: string = undefined,
  ) {
    return new PublicConsultation({
      title,
      description,
      imageUrl,
    });
  }
}

export const PublicConsultationSchema =
  SchemaFactory.createForClass(PublicConsultation);
