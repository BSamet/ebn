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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { hasRoles } from '../collecteur/auth/decorator/roles.decorator';
import { UserRole } from '../utilisateurs/dto/create-utilisateur.dto';
import { JwtAuthGuard } from '../collecteur/auth/guards/jwt-guard';
import { RolesGuard } from '../collecteur/auth/guards/roles.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all/:pages')
  findAllClientPagination(
    @Param('pages') pages: number,
    @Query('take') take: number,
  ) {
    const takeForBuilder = take || 10;
    const pagesForBuilder = pages || 1;
    const skipForBuilder = takeForBuilder * (pagesForBuilder - 1);

    return this.clientService.findAllClientPagination(
      takeForBuilder,
      skipForBuilder,
    );
  }

  @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne(id);
  }

  @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/mail')
  findByUserMail(@Body() createClientDto: CreateClientDto) {
    return this.clientService.findByUserMail(createClientDto.mail);
  }

  @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:mail')
  findOneUserByMail(@Param('mail') mail: string) {
    return this.clientService.findByUserMail(mail);
  }

  @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove(+id);
  }
}
