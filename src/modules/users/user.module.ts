import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AdminModule from '../admin/admin.module';
import userUsecases from './usecases';
import UserController from './user.controller';
import UserRepository from './user.repository';
import { User, UserSchema } from './user.schema';
import { USER_REPOSITORY_TOKEN } from './interfaces/user-repository.interface';

@Module({
  controllers: [UserController],
  imports: [
    AdminModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    ...userUsecases,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
  exports: [
    USER_REPOSITORY_TOKEN
  ]
})
export default class UserModule {}
