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
import {HistoriqueService} from './historique.service';
import {CreateHistoriqueDto} from './dto/create-historique.dto';
import {UpdateHistoriqueDto} from './dto/update-historique.dto';
import {hasRoles} from '../auth/decorator/roles.decorator';
import {UserRole} from '../utilisateurs/dto/create-utilisateur.dto';
import {JwtAuthGuard} from '../auth/guards/jwt-guard';
import {RolesGuard} from '../auth/guards/roles.guard';

@Controller('historique')
export class HistoriqueController {
    constructor(private readonly historiqueService: HistoriqueService) {
    }

    @hasRoles(UserRole.ADMIN, UserRole.COLLECTEUR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createHistoriqueDto: CreateHistoriqueDto) {
        return this.historiqueService.create(createHistoriqueDto);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll() {
        return this.historiqueService.findAll();
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.historiqueService.findOne(+id);
    }

    @hasRoles(UserRole.ADMIN, UserRole.CLIENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('customer/:id')
    findByClient(@Param('id') id: string) {
        return this.historiqueService.findByClient(+id);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/all/:pages')
    findAllHistoriquesPagination(
        @Param('pages') pages: number,
        @Query('take') take: number,
        @Query('orderBy') orderBy: string,
        @Query('nomCommercial') nomCommercial: string,
        @Query('typeAction') typeAction: string,
        @Query('typeDeDechet') typeDeDechet: string,
        @Query('startDate') dateStart: Date,
        @Query('enDate') dateEnd: Date,
    ) {

        const takeForBuilder = take || 10;
        const pagesForBuilder = pages || 1;
        const skipForBuilder = takeForBuilder * (pagesForBuilder - 1);

        return this.historiqueService.findAllHistoriquesPagination(
            takeForBuilder,
            skipForBuilder,
            orderBy,
            nomCommercial,
            typeAction,
            typeDeDechet,
            dateStart,
            dateEnd,
        );
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateHistoriqueDto: UpdateHistoriqueDto,
    ) {
        return this.historiqueService.update(+id, updateHistoriqueDto);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.historiqueService.remove(+id);
    }
}
