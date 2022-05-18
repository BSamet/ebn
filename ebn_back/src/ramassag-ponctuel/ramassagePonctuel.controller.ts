import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RamassagePonctuelService } from './ramassagePonctuel.service';
import { CreateRamassagePonctuelDto } from './dto/create-ramassagePonctuel.dto';
import { UpdateRamassagePonctuelDto } from './dto/update-ramassagePonctuel.dto';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../utilisateurs/dto/create-utilisateur.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('ramassage-ponctuel')
export class RamassageController {
  constructor(private readonly ramassageService: RamassagePonctuelService) {}

  @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createRamassagePonctuelDto: CreateRamassagePonctuelDto) {
    return this.ramassageService.create(createRamassagePonctuelDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.ramassageService.findAll();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ramassageService.findOne(+id);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRamassagePonctuelDto: UpdateRamassagePonctuelDto,
  ) {
    return this.ramassageService.update(+id, updateRamassagePonctuelDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ramassageService.remove(+id);
  }
}
