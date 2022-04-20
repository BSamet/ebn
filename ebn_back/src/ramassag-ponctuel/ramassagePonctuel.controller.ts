import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RamassagePonctuelService } from './ramassagePonctuel.service';
import { CreateRamassagePonctuelDto } from './dto/create-ramassagePonctuel.dto';
import { UpdateRamassagePonctuelDto } from './dto/update-ramassagePonctuel.dto';

@Controller('ramassage')
export class RamassageController {
  constructor(private readonly ramassageService: RamassagePonctuelService) {}

  @Post()
  create(@Body() createRamassagePonctuelDto: CreateRamassagePonctuelDto) {
    return this.ramassageService.create(createRamassagePonctuelDto);
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
  update(
    @Param('id') id: string,
    @Body() updateRamassagePonctuelDto: UpdateRamassagePonctuelDto,
  ) {
    return this.ramassageService.update(+id, updateRamassagePonctuelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ramassageService.remove(+id);
  }
}
