import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PublicConsultation, {
  PublicConsultationSchema,
} from './schemas/public-consultation.schema';
import usecases from './usecases';
import AuthModule from '../auth/auth.module';
import { PUBLIC_CONSULTATION_REPOSITORY_TOKEN } from './interfaces/public-consultation-repository.interface';
import PublicConsultationRepository from './public-consultation.repository';
import UserModule from '../users/user.module';
import PublicConsultationController from './public-consultation.controller';
import PublicConsultationVote, { PublicConsultationVoteSchema } from './schemas/public-consultation-vote.schema';
import AdminModule from '../admin/admin.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AdminModule,
    MongooseModule.forFeature([
      { name: PublicConsultation.name, schema: PublicConsultationSchema },
      { name: PublicConsultationVote.name, schema: PublicConsultationVoteSchema },
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
