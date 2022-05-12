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
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto, UserRole } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { catchError, map, Observable, of } from 'rxjs';
import { Utilisateur } from './entities/utilisateur.entity';
import { hasRoles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-guard';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post()
  create(
    @Body() createUtilisateurDto: CreateUtilisateurDto,
  ): Observable<Utilisateur | Object> {
    return this.utilisateursService.create(createUtilisateurDto).pipe(
      map((utilisateur: Utilisateur) => utilisateur),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Post('login')
  login(@Body() utilisateur: Utilisateur): Observable<Object> {
    return this.utilisateursService.login(utilisateur).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.utilisateursService.findAll();
  }

  @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilisateursService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ) {
    return this.utilisateursService.update(+id, updateUtilisateurDto);
  }

  @Patch(':id/role')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ): Observable<Utilisateur> {
    return this.utilisateursService.updateRoleOfUser(+id, updateUtilisateurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateursService.remove(+id);
  }
}
