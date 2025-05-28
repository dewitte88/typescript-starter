import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
    import { NamesService } from './names.service';
    import { CreateNameDto } from './dto/create-name.dto/create-name.dto';
    import { UpdateNameDto } from './dto/update-name.dto/update-name.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';

    @Controller('names')
    export class NamesController {
        constructor(private readonly namesService: NamesService,
            @Inject(REQUEST) private readonly request: Request, // Injecting the request object
        ){
            console.log('NamesController initialized');
            
        }
            @Get()
        findAll(@Query() paginationQuery: PaginationQueryDto) {
            // const { limit, offset } = paginationQuery;
            return this.namesService.findAll(paginationQuery);   
        }
            @Get(":id")
        findOne(@Param('id') id: number) {
            const name = this.namesService.findOne(id);
            if(!name){
                throw new NotFoundException (`Name #${id} not found`);
            }
            return name;
        }
            @Post()
        create(@Body() createNameDto: CreateNameDto){
        return this.namesService.create(createNameDto);
    }
            @Patch(":id")
        update(@Param('id') id, @Body() UpdateNameDto: UpdateNameDto){
        return this.namesService.update(id, UpdateNameDto);
    }
            @Delete(":id")
        remove(@Param('id') id){
        return this.namesService.remove(id);
    }

    }

