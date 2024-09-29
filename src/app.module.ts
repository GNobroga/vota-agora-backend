import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import InfrastructureModule from './infrastructure/infrastructure.module';
import UserModule from './modules/users/user.module';
import AuthModule from './modules/auth/auth.module';
import PublicConsultationModule from './modules/public-consultations/public-consultation.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'sqlite',
          database: 'vota-agora.db',
          entities: [
              __dirname + '/../**/*.entity{.ts,.js}',
          ],
          synchronize: true,
          dropSchema: true,
        }
      },
    }),
    ConfigModule.forRoot({
        envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
        validationSchema: Joi.object({
          'SERVER_PORT': Joi.number().required(),
          'BLOCKCHAIN_SERVER_PORT': Joi.number().required(),
          'JWT_SECRET': Joi.string().required(),
        }),
    }),
    InfrastructureModule,
    UserModule,
    PublicConsultationModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
