import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NamesModule } from './names/names.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    NamesModule, 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'db',
    autoLoadEntities: true,
    synchronize: true,
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
