import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RamassageAbonnementService } from './ramassage-abonnement.service';
import { CreateRamassageAbonnementDto } from './dto/create-ramassage-abonnement.dto';
import { UpdateRamassageAbonnementDto } from './dto/update-ramassage-abonnement.dto';

@Controller('ramassage-abonnement')
export class RamassageAbonnementController {
  constructor(private readonly ramassageAbonnementService: RamassageAbonnementService) {}

  @Post()
  create(@Body() createRamassageAbonnementDto: CreateRamassageAbonnementDto) {
    return this.ramassageAbonnementService.create(createRamassageAbonnementDto);
  }

  @Get()
  findAll() {
    return this.ramassageAbonnementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ramassageAbonnementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRamassageAbonnementDto: UpdateRamassageAbonnementDto) {
    return this.ramassageAbonnementService.update(+id, updateRamassageAbonnementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ramassageAbonnementService.remove(+id);
  }
}
