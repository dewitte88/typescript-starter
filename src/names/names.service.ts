import { Inject, Injectable, Scope } from '@nestjs/common';
import { Name } from './entities/names.entity';
import { CreateNameDto } from './dto/create-name.dto/create-name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNameDto } from './dto/update-name.dto/update-name.dto';
import { Gender } from './entities/gender.entity/gender.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Name_brands } from './names.constants';
import {DataSource} from 'typeorm';

@Injectable({scope: Scope.REQUEST}) 
export class NamesService {
    constructor( 
        @InjectRepository(Name)
        private readonly nameRepository: Repository<Name>,
        @InjectRepository(Gender)
        private readonly genderRepository: Repository<Gender>,
        private readonly connection: DataSource,
        @Inject(Name_brands) nameBrands: string[] // Injecting a custom provider for name brands
    ){
        console.log('name service test');
    }
async findAll(paginationQuery: PaginationQueryDto): Promise<any[]> {
    const { limit, offset } = paginationQuery;
        return this.nameRepository.find({ relations: ['gender'], skip: offset, take: limit });
    }
async findOne(id: number): Promise<any> 
{
    // Also load related genders
    const name = await this.nameRepository.findOne({ where: { id }, relations: ['gender'] });
    if (!name) {
        return null; // or throw an exception if you prefer
    }
    return name
}
   
async preloadOrCreateGenderByName(name: string): Promise<Gender> {
    let gender = await this.genderRepository.findOne({ where: { name } });
    if (!gender) {
        gender = this.genderRepository.create({ name });
        gender = await this.genderRepository.save(gender);
    } 
    return gender;
}

async create(createNameDto: CreateNameDto): Promise<Name> {
    const genders = await this.getOrCreateGenders(createNameDto.gender);
    const name = this.nameRepository.create({
        ...createNameDto,
        gender: genders,
        description: createNameDto.description
    });
    return this.nameRepository.save(name);
}

async update(id: number, updateNameDto: UpdateNameDto): Promise<Name | string> {
    let updatePayload: any = { id: +id, ...updateNameDto };

    if (updateNameDto.gender) {
        const genders = await this.getOrCreateGenders(updateNameDto.gender);
        updatePayload.gender = genders;
    }

    const names = await this.nameRepository.preload(updatePayload);

    if (!names) {
        return `Name #${id} not found`;
    }
    return this.nameRepository.save(names);
}

private async getOrCreateGenders(genderInput: string[] | string): Promise<Gender[]> {
    const genderArray = Array.isArray(genderInput) ? genderInput : [genderInput];
    const genders = await Promise.all(genderArray.map(name => this.preloadOrCreateGenderByName(name)));
    return genders.sort((a, b) => a.id - b.id);
}

async recommend(name: Name) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        name.recommendations++;
        // Replace with your custom Event entity import if needed
        // For example, if you have an Event entity: import { Event } from '../events/entities/event.entity';
        // Make sure to import the Event entity at the top of your file:
        // import { Event } from '../events/entities/event.entity';
        const recommendEvent = this.connection.manager.create('Event' as any, {}) as any;

     recommendEvent.name = "recommend_name";
     recommendEvent.type = "name";
     recommendEvent.payload = { name: name.Name };

     await queryRunner.manager.save(recommendEvent);
     await queryRunner.manager.save(name);

        await queryRunner.commitTransaction();
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }}

async remove(id: number) {
    const name = await this.nameRepository.findOne({ where: { id } });
    if (!name) {
        return null
    }
    return this.nameRepository.remove(name);
    
}

}