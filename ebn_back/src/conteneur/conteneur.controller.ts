/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ConteneurService} from './conteneur.service';
import {CreateConteneurDto} from './dto/create-conteneur.dto';
import {UpdateConteneurDto} from './dto/update-conteneur.dto';

@Controller('conteneur')
export class ConteneurController {
    constructor(private readonly conteneurService: ConteneurService) {
    }

    @Post()
    create(@Body() createConteneurDto: CreateConteneurDto) {
        return this.conteneurService.create(createConteneurDto);
    }

    @Get()
    findAll() {
        return this.conteneurService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.conteneurService.findOne(+id);
    }

    @Get('/all/:pages')
    findAllConteneurPagination(@Param('pages') pages: number, @Query('take') take: number) {
        const takeForBuilder = take || 10
        const pagesForBuilder = pages || 1
        const skipForBuilder = takeForBuilder * (pagesForBuilder - 1)

        return this.conteneurService.findAllConteneurPagination(takeForBuilder, skipForBuilder);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateConteneurDto: UpdateConteneurDto) {
        return this.conteneurService.update(+id, updateConteneurDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.conteneurService.remove(+id);
    }
}
