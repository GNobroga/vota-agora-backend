import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AdminModule from './modules/admin/admin.module';
import AuthModule from './modules/auth/auth.module';
import PublicConsultationModule from './modules/public-consultation/public-consultation.module';
import AppConfig from './modules/shared/app.config';
import SharedModule from './modules/shared/shared.module';
import UserModule from './modules/users/user.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRootAsync({
      useFactory(appConfig: AppConfig) {
        return {
          uri: appConfig.databaseURL,
        };
      },
      inject: [AppConfig],
      imports: [
        SharedModule,
        AdminModule,
        UserModule,
        AuthModule,
        PublicConsultationModule,
      ],
    }),
  ],
  controllers: [],
})
export class AppModule {}
