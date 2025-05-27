import { Module } from '@nestjs/common';
import { NamesService } from './names.service';
import { NamesController } from './names.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Name } from './entities/names.entity';
import { Gender } from './entities/gender.entity/gender.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Name, Gender, Event])], 
    controllers: [NamesController],
    providers: [NamesService]}
)
export class NamesModule {}
