import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NamesModule } from './names/names.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameRatingModule } from './name-rating/name-rating.module';
import { DatabaseModule } from './database/database.module'; 
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    NamesModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'db',
    autoLoadEntities: true,
    synchronize: true,
  }), NameRatingModule, DatabaseModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
