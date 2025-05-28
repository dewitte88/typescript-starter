import { Injectable, Module, Scope } from '@nestjs/common';
import { NamesService } from './names.service';
import { NamesController } from './names.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Name } from './entities/names.entity';
import { Gender } from './entities/gender.entity/gender.entity';
import { Name_brands } from './names.constants';
import { DataSource } from 'typeorm';

@Injectable() 
export class NameFactory    {
    create(name: string, description: string): Name {
        const newName = new Name();
        newName.Name = name;
        newName.description = description;
        return newName;
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Name, Gender, Event])], 
    controllers: [NamesController],
    providers: [
        NamesService,
        {
            provide: Name_brands,
            useFactory: async (dataSource: DataSource): Promise<string[]> => {
                const nameBrands = await Promise.resolve(['Brand1', 'Brand2', 'Brand3']);
               
                console.log('test!');
                return nameBrands;
            },
            inject: [DataSource],
            scope: Scope.TRANSIENT,
        },
    ],
    exports: [NamesService],
})
export class NamesModule {}
