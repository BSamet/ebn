import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeDechetsService } from './type-dechets.service';
import { CreateTypeDechetDto } from './dto/create-type-dechet.dto';
import { UpdateTypeDechetDto } from './dto/update-type-dechet.dto';

@Controller('type-dechets')
export class TypeDechetsController {
  constructor(private readonly typeDechetsService: TypeDechetsService) {}

  @Post()
  create(@Body() createTypeDechetDto: CreateTypeDechetDto) {
    return this.typeDechetsService.create(createTypeDechetDto);
  }

  @Get()
  findAll() {
    return this.typeDechetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeDechetsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeDechetDto: UpdateTypeDechetDto,
  ) {
    return this.typeDechetsService.update(+id, updateTypeDechetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeDechetsService.remove(+id);
  }
}
