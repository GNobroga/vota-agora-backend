import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PublicConsultation, {
  PublicConsultationSchema,
} from './public-consultation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PublicConsultation.name, schema: PublicConsultationSchema },
    ]),
  ],
})
export default class PublicConsultationModule {}
