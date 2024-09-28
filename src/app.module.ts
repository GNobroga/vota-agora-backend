import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AppConfig from './modules/shared/app.config';
import SharedModule from './modules/shared/shared.module';
import AdminModule from './modules/admin/admin.module';

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
      imports: [SharedModule, AdminModule]
    }),
  ],
  controllers: [],
})
export class AppModule {

  
}
