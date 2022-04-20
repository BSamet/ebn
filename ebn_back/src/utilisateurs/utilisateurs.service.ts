import {Injectable} from '@nestjs/common';
import {CreateUtilisateurDto} from './dto/create-utilisateur.dto';
import {UpdateUtilisateurDto} from './dto/update-utilisateur.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Utilisateur} from "./entities/utilisateur.entity";

@Injectable()
export class UtilisateursService {
    constructor(
        @InjectRepository(Utilisateur)
        private readonly utilisateurRepository: Repository<Utilisateur>,
    ) {
    }

    create(createUtilisateurDto: CreateUtilisateurDto) {
        const utilisateur = new Utilisateur();
        utilisateur.role = createUtilisateurDto.role;
        utilisateur.utilisateur = createUtilisateurDto.utilisateur;
        utilisateur.password = createUtilisateurDto.password;
        utilisateur.nom = createUtilisateurDto.nom;
        utilisateur.prenom = createUtilisateurDto.prenom;
        utilisateur.mail = createUtilisateurDto.mail;
        utilisateur.telephone = createUtilisateurDto.telephone;
        return this.utilisateurRepository.save(utilisateur);
    }

    findAll() {
        return this.utilisateurRepository.find();
    }

    findOne(id: number) {
        return this.utilisateurRepository.findOne(id);
    }

    update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
        return this.utilisateurRepository.update(id, updateUtilisateurDto);
    }

    remove(id: number) {
        return this.utilisateurRepository.delete(id);
    }
}
