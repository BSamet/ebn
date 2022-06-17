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
import { EtapeService } from './etape.service';
import { CreateEtapeDto } from './dto/create-etape.dto';
import { UpdateEtapeDto } from './dto/update-etape.dto';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../utilisateurs/dto/create-utilisateur.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('etape')
export class EtapeController {
  constructor(private readonly etapeService: EtapeService) {}

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createEtapeDto: CreateEtapeDto) {
    return this.etapeService.create(createEtapeDto);
  }
  
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.etapeService.findAll();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.etapeService.findOne(+id);
  }

  @hasRoles(UserRole.ADMIN, UserRole.COLLECTEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('collecteur/:id')
  findByCollecteur(@Param('id') id: number) {
    return this.etapeService.findByCollecteur(+id);
  }

  @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('client/:id')
  findByClient(@Param('id') id: number) {
    return this.etapeService.findByClient(+id);
  }

  @hasRoles(UserRole.ADMIN, UserRole.COLLECTEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtapeDto: UpdateEtapeDto) {
    return this.etapeService.update(+id, updateEtapeDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.etapeService.remove(+id);
  }
}
