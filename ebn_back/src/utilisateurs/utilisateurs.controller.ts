import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UtilisateursService} from './utilisateurs.service';
import {CreateUtilisateurDto} from './dto/create-utilisateur.dto';
import {UpdateUtilisateurDto} from './dto/update-utilisateur.dto';
import {catchError, map, Observable, of} from "rxjs";
import {Utilisateur} from "./entities/utilisateur.entity";

@Controller('utilisateurs')
export class UtilisateursController {
    constructor(private readonly utilisateursService: UtilisateursService) {
    }

    @Post()
    create(@Body() createUtilisateurDto: CreateUtilisateurDto): Observable<Utilisateur | Object> {
        return this.utilisateursService.create(createUtilisateurDto).pipe(
            map((utilisateur: Utilisateur) => utilisateur),
            catchError(err => of({error: err.message}))
        );
    }

    @Post('login')
    login(@Body() utilisateur: Utilisateur): Observable<Object> {
        return this.utilisateursService.login(utilisateur).pipe(
            map((jwt: string) => {
                return {access_token: jwt};
            })
        )
    }

    @Get()
    findAll() {
        return this.utilisateursService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.utilisateursService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUtilisateurDto: UpdateUtilisateurDto) {
        return this.utilisateursService.update(+id, updateUtilisateurDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.utilisateursService.remove(+id);
    }
}
