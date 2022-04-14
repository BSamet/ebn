import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RamassageService } from './ramassage.service';
import { CreateRamassageDto } from './dto/create-ramassage.dto';
import { UpdateRamassageDto } from './dto/update-ramassage.dto';

@Controller('ramassage')
export class RamassageController {
  constructor(private readonly ramassageService: RamassageService) {}

  @Post()
  create(@Body() createRamassageDto: CreateRamassageDto) {
    return this.ramassageService.create(createRamassageDto);
  }

  @Get()
  findAll() {
    return this.ramassageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ramassageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRamassageDto: UpdateRamassageDto) {
    return this.ramassageService.update(+id, updateRamassageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ramassageService.remove(+id);
  }
}
