import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UsePipes } from '@nestjs/common';
    import { NamesService } from './names.service';
    import { CreateNameDto } from './dto/create-name.dto/create-name.dto';
    import { UpdateNameDto } from './dto/update-name.dto/update-name.dto';
    import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
    import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/decorators/public.decorator';
import { Protocol } from 'src/common/decorators/protocol.decorator';

    @Controller('names')
    export class NamesController {
        constructor(private readonly namesService: NamesService,
            @Inject(REQUEST) private readonly request: Request, // Injecting the request object
        ){
            console.log('NamesController initialized');
            
        }
            @Public()
            @Get()
        async findAll(@Protocol("http") protocol: string, @Query() paginationQuery: PaginationQueryDto) {
            console.log(`Finding all names with protocol: ${protocol}`);
            
            return this.namesService.findAll(paginationQuery);   
        }
            @Get(":id")
        async findOne(@Param('id', ParseIntPipe) id: number) {
            console.log(`Finding name with ID: ${id}`);

            const name = await this.namesService.findOne(id);
            if (!name) {
                throw new NotFoundException(`Name #${id} not found`);
            }
            return name;
        } 
            @Post()
       async create(@Body() createNameDto: CreateNameDto){
        return await this.namesService.create(createNameDto);
    }
            @Patch(":id")
        async update(@Param('id') id, @Body() updateNameDto: UpdateNameDto){
        return await this.namesService.update(id, updateNameDto);
    }
            @Delete(":id")
        async remove(@Param('id') id){
        return await this.namesService.remove(id);
    }

    }

