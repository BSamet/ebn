import { Injectable } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { AuthService } from '../collecteur/auth/services/auth.service';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
    private authService: AuthService,
  ) {}

  create(createUtilisateurDto: CreateUtilisateurDto) {
      return this.authService.hashPassword(createUtilisateurDto.password).pipe(
        switchMap((passwordHash: string) => {
          const utilisateur = new Utilisateur();
          utilisateur.role = createUtilisateurDto.role;
          utilisateur.password = passwordHash;
          utilisateur.nom = createUtilisateurDto.nom;
          utilisateur.prenom = createUtilisateurDto.prenom;
          utilisateur.mail = createUtilisateurDto.mail;
          utilisateur.telephone = createUtilisateurDto.telephone;
          
            return from(this.utilisateurRepository.save(utilisateur)).pipe(
              map((utilisateur: Utilisateur) => {
                const { password, ...result } = utilisateur;
                return result;
              }),
              catchError((err) => throwError(err)),
            );
        }),
      );
    
  }

  findAll() {
    return from(this.utilisateurRepository.find()).pipe(
      map((utilisateurs) => {
        utilisateurs.forEach(function (v) {
          delete v.password;
        });
        return utilisateurs;
      }),
    );
  }

  findOne(id: number) {
    return from(this.utilisateurRepository.findOne({
        where: {
            id: id
        }
    })).pipe(
      map((utilisateur: Utilisateur) => {
        const { password, ...result } = utilisateur;
        return result;
      }),
    );
  }

  update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    console.log(updateUtilisateurDto);
    
    delete updateUtilisateurDto.mail;
    delete updateUtilisateurDto.password;

    return this.utilisateurRepository.update(id, updateUtilisateurDto);
  }

  updateRoleOfUser(
    id: number,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Observable<any> {
    return from(this.utilisateurRepository.update(id, updateUtilisateurDto));
  }

  remove(id: number) {
    return this.utilisateurRepository.delete(id);
  }

  login(utilisateur: Utilisateur) {
    return this.validateUtilisateur(
      utilisateur.mail,
      utilisateur.password,
    ).pipe(
      switchMap((utilisateur: Utilisateur) => {
        if (utilisateur) {
          return this.authService
            .generateJWT(utilisateur)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }

  validateUtilisateur(mail: string, password: string) {
    return this.findByMail(mail).pipe(
      switchMap((utilisateur: Utilisateur) =>
        this.authService.comparePasswords(password, utilisateur.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = utilisateur;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }

  findByMail(mail: string) {
    return from(this.utilisateurRepository.findOne({
        where: {
            mail: mail
        }
    }));
  }
}
