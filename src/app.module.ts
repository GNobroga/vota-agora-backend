import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import InfrastructureModule from './infrastructure/infrastructure.module';
import BlockchainService from './infrastructure/services/blockchain.service';
import AuthModule from './modules/auth/auth.module';
import PublicConsultationModule from './modules/public-consultations/public-consultation.module';
import CreateNewUserUseCase from './modules/users/usecases/create-new-user.usecase';
import UserModule from './modules/users/user.module';
import UserDataSeed from './modules/seeds/user-data.seed';
import SeedModule from './modules/seeds/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'sqlite',
          database: 'vota-agora.db',
          entities: [
              __dirname + '/../**/*.entity{.ts,.js}',
              __dirname + '/../**/*.projection{.ts,.js}',
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
    AuthModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {

  constructor(
    readonly blockchainService: BlockchainService,
    readonly createNewUserUseCase: CreateNewUserUseCase,
    readonly userDataSeed: UserDataSeed,
  ) {} 
  
  async onModuleInit() {
    await this.blockchainService.init(async () => {
        const { id } = await this.createNewUserUseCase.execute({
          fullName: 'Gabriel Cardoso Girarde',
          document: '173.645.097-20',
          password: 'camilo123',
      });
      await this.userDataSeed.populate(id);
    });
  }
  
}
