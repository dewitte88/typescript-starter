import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NamesModule } from './names/names.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameRatingModule } from './name-rating/name-rating.module';
import { DatabaseModule } from './database/database.module'; 
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import appConfig from 'config/app.config';
@Module({
  imports: [
    NamesModule, 
    ConfigModule.forRoot({
      load: [appConfig]
    }), 
    TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  }),
  }),
  NameRatingModule,
  DatabaseModule,
  CommonModule,
],
  controllers: [AppController],
  providers: [AppService,
    

  ],
})
export class AppModule {}
