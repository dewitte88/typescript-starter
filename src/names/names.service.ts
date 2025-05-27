import { Injectable } from '@nestjs/common';
import { Name } from './entities/names.entity';
import { CreateNameDto } from './dto/create-name.dto/create-name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UpdateNameDto } from './dto/update-name.dto/update-name.dto';
import { Gender } from './entities/gender.entity/gender.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class NamesService {
    constructor( 
        @InjectRepository(Name)
        private readonly nameRepository: Repository<Name>,
          @InjectRepository(Gender)
        private readonly genderRepository: Repository<Gender>,
        private readonly connection: Connection,
    ){}
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

async create(createNameDto: CreateNameDto): Promise<any> 
{
    const genderArray = Array.isArray(createNameDto.gender) ? createNameDto.gender : [createNameDto.gender];
    // Get or create all genders from DB
    const genders = (await Promise.all(genderArray.map(name => this.preloadOrCreateGenderByName(name))))
        .sort((a, b) => a.id - b.id); // Sort genders by id ascending
    const name = this.nameRepository.create({
        ...createNameDto,
        gender: genders,
        description: createNameDto.description // add description if present
    });
    const saved = await this.nameRepository.save(name);
    return {
        id: saved.id,
        name: saved.Name,
        description: saved.description,
        gender: saved.gender.map(g => ({ id: g.id, name: g.name }))
    };
}

async update(id: number, updateNameDto: UpdateNameDto) {
    let genders = undefined;
    if (updateNameDto.gender) {
        const genderArray = Array.isArray(updateNameDto.gender) ? updateNameDto.gender : [updateNameDto.gender];
        genders = await Promise.all(genderArray.map(name => this.preloadOrCreateGenderByName(name)));
    }
    const names = await this.nameRepository.preload({
        id: +id,
        ...updateNameDto,
        gender: genders,
        description: updateNameDto.description // add description if present
    });
    if (!names) {
        return `Name #${id} not found`;
    }
    const saved = await this.nameRepository.save({ ...names, ...updateNameDto, gender: genders, description: updateNameDto.description });
    return {
        id: saved.id,
        name: saved.name,
        description: saved.description,
        gender: saved.gender.map(g => ({ id: g.id, name: g.name }))
    };    

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