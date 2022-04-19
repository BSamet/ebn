import {Injectable} from '@nestjs/common';
import {CreateConteneurDto} from './dto/create-conteneur.dto';
import {UpdateConteneurDto} from './dto/update-conteneur.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Conteneur} from './entities/conteneur.entity';
import {Client} from '../client/entities/client.entity';
import {Tournee} from '../tournee/entities/tournee.entity';
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
        conteneur.poid = createConteneurDto.poid;
        conteneur.typeDechet = Object.assign(new TypeDechet(), {
            id: createConteneurDto.typeDechetId,
        });
        conteneur.client = Object.assign(new Client(), {
            id: createConteneurDto.clientId,
        });
        conteneur.tournee = Object.assign(new Tournee(), {
            id: createConteneurDto.tourneeId,
        });
        return this.conteneurRepository.save(conteneur);
    }

    findAll() {
        return this.conteneurRepository.find();
    }

    findOne(id: number) {
        return this.conteneurRepository.findOne(id);
    }

    update(id: number, updateConteneurDto: UpdateConteneurDto) {
        return this.conteneurRepository.update(id, updateConteneurDto);
    }

    remove(id: number) {
        return this.conteneurRepository.delete(id);
    }
}
