import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollecteurService } from './collecteur.service';
import { CreateCollecteurDto } from './dto/create-collecteur.dto';
import { UpdateCollecteurDto } from './dto/update-collecteur.dto';

@Controller('collecteur')
export class CollecteurController {
  constructor(private readonly collecteurService: CollecteurService) {}

  @Post()
  create(@Body() createCollecteurDto: CreateCollecteurDto) {
    return this.collecteurService.create(createCollecteurDto);
  }

  @Get()
  findAll() {
    return this.collecteurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collecteurService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollecteurDto: UpdateCollecteurDto) {
    return this.collecteurService.update(+id, updateCollecteurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collecteurService.remove(+id);
  }
}
