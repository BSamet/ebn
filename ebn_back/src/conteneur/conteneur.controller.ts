/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConteneurService } from './conteneur.service';
import { CreateConteneurDto } from './dto/create-conteneur.dto';
import { UpdateConteneurDto } from './dto/update-conteneur.dto';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../utilisateurs/dto/create-utilisateur.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('conteneur')
export class ConteneurController {
  constructor(private readonly conteneurService: ConteneurService) {}

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createConteneurDto: CreateConteneurDto) {
    return this.conteneurService.create(createConteneurDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.conteneurService.findAll();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.conteneurService.findOne(+id);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all/:pages')
  findAllConteneurPagination(
    @Param('pages') pages: number,
    @Query('take') take: number,
  ) {
    const takeForBuilder = take || 10;
    const pagesForBuilder = pages || 1;
    const skipForBuilder = takeForBuilder * (pagesForBuilder - 1);

    return this.conteneurService.findAllConteneurPagination(
      takeForBuilder,
      skipForBuilder,
    );
  }

  @hasRoles(UserRole.ADMIN, UserRole.COLLECTEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/infos')
  findOneWithAllInfos(@Param('id') id: number) {
      return this.conteneurService.findOneWithAllInfos(+id);
  }

  @hasRoles(UserRole.ADMIN, UserRole.COLLECTEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateConteneurDto: UpdateConteneurDto,
  ) {
    return this.conteneurService.update(+id, updateConteneurDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.conteneurService.remove(+id);
  }
}
