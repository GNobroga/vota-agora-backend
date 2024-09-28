import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import userUsecases from './usecases';
import UserController from './user.controller';
import UserRepository, { USER_REPOSITORY_TOKEN } from './user.repository';
import { User, UserSchema } from './user.schema';
import AdminModule from '../admin/admin.module';

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
})
export default class UserModule {}
