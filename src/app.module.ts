import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NamesController } from './names/names.controller';
import { NamesService } from './names/names.service';

@Module({
  imports: [],
  controllers: [AppController, NamesController],
  providers: [AppService, NamesService],
})
export class AppModule {}
