import {Injectable} from '@nestjs/common';
import {CreateConteneurDto} from './dto/create-conteneur.dto';
import {UpdateConteneurDto} from './dto/update-conteneur.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Conteneur} from './entities/conteneur.entity';
import {Client} from '../client/entities/client.entity';
import {TypeDechet} from "../type-dechets/entities/type-dechet.entity";

@Injectable()
export class ConteneurService {

    constructor(
        @InjectRepository(Conteneur)
        private readonly conteneurRepository: Repository<Conteneur>,
    ) {
    }

    create(createConteneurDto: CreateConteneurDto) {
        const conteneur = new Conteneur();
        conteneur.capaciteMax = createConteneurDto.capaciteMax;
        conteneur.isAvailable = createConteneurDto.isAvailable;
        conteneur.typeDechet = Object.assign(new TypeDechet(), {
            id: createConteneurDto.typeDechetId,
        });
        if (createConteneurDto.clientId) {
            conteneur.client = Object.assign(new Client(), {
                id: createConteneurDto.clientId,
            });
        }
        return this.conteneurRepository.save(conteneur);
    }

    findAll() {
        return this.conteneurRepository.find();
    }

    findOne(id: number) {
        return this.conteneurRepository.findOne(id);
    }

    findAllConteneurPagination(take: number, skip: number) {
        return this.conteneurRepository
            .createQueryBuilder("conteneur")
            .leftJoinAndSelect("conteneur.client", "client")
            .leftJoinAndSelect("client.utilisateur", "utilisateur")
            .leftJoinAndSelect("conteneur.typeDechet", "typeDechet")
            .select("conteneur")
            .addSelect("client.nomCommercial")
            .addSelect("utilisateur.nom")
            .addSelect("utilisateur.prenom")
            .addSelect("typeDechet.typeDechets")
            .take(take)
            .skip(skip)
            .getMany()
    }

    update(id: number, updateConteneurDto: UpdateConteneurDto) {
        return this.conteneurRepository.update(id, updateConteneurDto);
    }

    remove(id: number) {
        return this.conteneurRepository.delete(id);
    }
}
