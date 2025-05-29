import { Injectable, Module, Scope } from '@nestjs/common';
import { NamesService } from './names.service';
import { NamesController } from './names.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Name } from './entities/names.entity';
import { Gender } from './entities/gender.entity/gender.entity';
import { Name_brands } from './names.constants';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import namesConfig from './config/names.config';



@Module({
    imports: [TypeOrmModule.forFeature([Name, Gender, Event]), ConfigModule.forFeature(namesConfig)], 
    controllers: [NamesController], 
    providers: [NamesService],
    exports: [NamesService],
})
export class NamesModule {}
