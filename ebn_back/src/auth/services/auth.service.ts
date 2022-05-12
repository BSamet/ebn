import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {from, Observable, of} from "rxjs";
import {Utilisateur} from "../../utilisateurs/entities/utilisateur.entity";

const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {
    }

    generateJWT(utilisateur: Utilisateur): Observable<string> {
        return from(this.jwtService.signAsync({utilisateur}));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean> {
        return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
    }
}
