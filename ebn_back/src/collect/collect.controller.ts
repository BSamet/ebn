import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {CollectService} from './collect.service';
import {CreateCollectDto} from './dto/create-collect.dto';
import {UpdateCollectDto} from './dto/update-collect.dto';
import {hasRoles} from "../auth/decorator/roles.decorator";
import {UserRole} from "../utilisateurs/dto/create-utilisateur.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-guard";
import {RolesGuard} from "../auth/guards/roles.guard";

@Controller('collect')
export class CollectController {
    constructor(private readonly collectService: CollectService) {
    }

    @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createCollectDto: CreateCollectDto) {
        console.log(createCollectDto)
        return this.collectService.create(createCollectDto);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll() {
        return this.collectService.findAll();
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/date')
    findAllByDateOrClient(@Query('date') date: Date, @Query('clientId') clientId: number) {
        return this.collectService.findAllByDate(date, clientId);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.collectService.findOne(+id);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCollectDto: UpdateCollectDto) {
        return this.collectService.update(+id, updateCollectDto);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.collectService.remove(+id);
    }
}
