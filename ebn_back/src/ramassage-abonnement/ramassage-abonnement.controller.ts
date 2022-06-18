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
import { RamassageAbonnementService } from './ramassage-abonnement.service';
import { CreateRamassageAbonnementDto } from './dto/create-ramassage-abonnement.dto';
import { UpdateRamassageAbonnementDto } from './dto/update-ramassage-abonnement.dto';
import { hasRoles } from '../collecteur/auth/decorator/roles.decorator';
import { UserRole } from '../utilisateurs/dto/create-utilisateur.dto';
import { JwtAuthGuard } from '../collecteur/auth/guards/jwt-guard';
import { RolesGuard } from '../collecteur/auth/guards/roles.guard';

@Controller('ramassage-abonnement')
export class RamassageAbonnementController {
  constructor(
    private readonly ramassageAbonnementService: RamassageAbonnementService,
  ) {}

  @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createRamassageAbonnementDto: CreateRamassageAbonnementDto) {
    return this.ramassageAbonnementService.create(createRamassageAbonnementDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.ramassageAbonnementService.findAll();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ramassageAbonnementService.findOne(+id);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRamassageAbonnementDto: UpdateRamassageAbonnementDto,
  ) {
    return this.ramassageAbonnementService.update(
      +id,
      updateRamassageAbonnementDto,
    );
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ramassageAbonnementService.remove(+id);
  }
}
