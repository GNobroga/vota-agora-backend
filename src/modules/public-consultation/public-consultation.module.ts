import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PublicConsultation, {
  PublicConsultationSchema,
} from './public-consultation.schema';
import usecases from './usecases';
import AuthModule from '../auth/auth.module';
import { PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from './interfaces/public-consultation-repository.interface';
import PublicConsultationRepository from './public-consultation.repository';
import UserModule from '../users/user.module';
import PublicConsultationController from './public-consultation.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forFeature([
      { name: PublicConsultation.name, schema: PublicConsultationSchema },
    ]),
  ],
  controllers: [PublicConsultationController],
  providers: [
      ...usecases,
      {
        provide: PUBLIC_CONSULTATION_REPOSITORY_TOKEN,
        useClass: PublicConsultationRepository,
      }
  ]
})
export default class PublicConsultationModule {}
