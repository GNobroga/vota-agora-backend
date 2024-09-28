import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AdminModule from './modules/admin/admin.module';
import AppConfig from './modules/shared/app.config';
import SharedModule from './modules/shared/shared.module';
import UserModule from './modules/users/v1/user.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRootAsync({
      useFactory(appConfig: AppConfig) {
        return {
          uri: appConfig.getDatabaseURL(),
        }
      },
      inject: [AppConfig],
      imports: [SharedModule, AdminModule, UserModule],
    }),
  ],
  controllers: [],
})
export class AppModule {

  
}
