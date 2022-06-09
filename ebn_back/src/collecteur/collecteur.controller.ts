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
import { CollecteurService } from './collecteur.service';
import { CreateCollecteurDto } from './dto/create-collecteur.dto';
import { UpdateCollecteurDto } from './dto/update-collecteur.dto';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../utilisateurs/dto/create-utilisateur.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('collecteur')
export class CollecteurController {
  constructor(private readonly collecteurService: CollecteurService) {}

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCollecteurDto: CreateCollecteurDto) {
    return this.collecteurService.create(createCollecteurDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.collecteurService.findAll();
  }

  @hasRoles(UserRole.ADMIN, UserRole.COLLECTEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collecteurService.findOne(+id);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all/:pages')
  findAllCollecteurPagination(
    @Param('pages') pages: number,
    @Query('take') take: number,
  ) {
    const takeForBuilder = take || 10;
    const pagesForBuilder = pages || 1;
    const skipForBuilder = takeForBuilder * (pagesForBuilder - 1);

    return this.collecteurService.findAllCollecteurPagination(
      takeForBuilder,
      skipForBuilder,
    );
  }

  @hasRoles(UserRole.ADMIN, UserRole.COLLECTEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/mail')
  findByUserMail(@Body() createCollecteurDto: CreateCollecteurDto) {
    return this.collecteurService.findByUserMail(createCollecteurDto.mail);
  }

  @hasRoles(UserRole.ADMIN, UserRole.COLLECTEUR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollecteurDto: UpdateCollecteurDto,
  ) {
    return this.collecteurService.update(+id, updateCollecteurDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collecteurService.remove(+id);
  }
}
