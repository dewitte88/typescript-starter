    import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
    import { get } from 'http';
    import { NamesService } from './names.service';

    @Controller('names')
    export class NamesController {
        constructor(private readonly namesService: NamesService){
            
        }
            @Get()
        findAll(@Query() paginationQuery ) {
            // const { limit, offset } = paginationQuery;
            return this.namesService.findAll();   
        }
            @Get(":id")
        findOne(@Param('id', ParseIntPipe) id: number) {
            return this.namesService.findOne(id);
        }
            @Post()
        create(@Body() body){
        return this.namesService.create(body);
    }
            @Patch(":id")
        update(@Param('id', ParseIntPipe) id, @Body() body){
        return this.namesService.update(id, body);
    }
            @Delete(":id")
        remove(@Param('id', ParseIntPipe) id){
        return this.namesService.remove(id);
    }

    }

