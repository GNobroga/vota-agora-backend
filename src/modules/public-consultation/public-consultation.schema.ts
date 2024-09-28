import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop()
  endDate: Date;

  constructor(props: Partial<PublicConsultation>) {
    this.title = props?.title ?? this.title;
    this.description = props?.description ?? this.description;
    this.initialDate = props?.initialDate ?? this.initialDate;
    this.endDate = props?.endDate ?? this.endDate;
    this.imageUrl = props?.imageUrl ?? this.imageUrl;
  }

  static create(title: string, description: string, initialDate: Date, endDate: Date) {
    return new PublicConsultation({
        title,
        description,
        initialDate,
        endDate
    });
  }

  static update(title: string, description: string, imageUrl: string = undefined) {
    return new PublicConsultation({
        title, 
        description,
        imageUrl
    });
  }
}

export const PublicConsultationSchema =
  SchemaFactory.createForClass(PublicConsultation);
