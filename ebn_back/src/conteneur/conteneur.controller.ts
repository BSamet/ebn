import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConteneurService } from './conteneur.service';
import { CreateConteneurDto } from './dto/create-conteneur.dto';
import { UpdateConteneurDto } from './dto/update-conteneur.dto';

@Controller('conteneur')
export class ConteneurController {
  constructor(private readonly conteneurService: ConteneurService) {}

  @Post()
  create(@Body() createConteneurDto: CreateConteneurDto) {
    return this.conteneurService.create(createConteneurDto);
  }

  @Get()
  findAll() {
    return this.conteneurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conteneurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConteneurDto: UpdateConteneurDto) {
    return this.conteneurService.update(+id, updateConteneurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conteneurService.remove(+id);
  }
}
