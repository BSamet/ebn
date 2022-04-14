import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourneeService } from './tournee.service';
import { CreateTourneeDto } from './dto/create-tournee.dto';
import { UpdateTourneeDto } from './dto/update-tournee.dto';

@Controller('tournee')
export class TourneeController {
  constructor(private readonly tourneeService: TourneeService) {}

  @Post()
  create(@Body() createTourneeDto: CreateTourneeDto) {
    return this.tourneeService.create(createTourneeDto);
  }

  @Get()
  findAll() {
    return this.tourneeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourneeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourneeDto: UpdateTourneeDto) {
    return this.tourneeService.update(+id, updateTourneeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourneeService.remove(+id);
  }
}
