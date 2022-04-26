import {Injectable} from '@nestjs/common';
import {CreateEtapeDto} from './dto/create-etape.dto';
import {UpdateEtapeDto} from './dto/update-etape.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Client} from "../client/entities/client.entity";
import {Repository} from "typeorm";
import {Etape} from "./entities/etape.entity";
import {Collecteur} from "../collecteur/entities/collecteur.entity";

@Injectable()
export class EtapeService {
    constructor(
        @InjectRepository(Etape)
        private readonly etapeRepository: Repository<Etape>,
    ) {
    }

    create(createEtapeDto: CreateEtapeDto) {
        const etape = new Etape();
        etape.isCollected = createEtapeDto.isCollected;
        etape.commentaire = createEtapeDto.commentaire;
        etape.client = Object.assign(new Client(), {
            id: createEtapeDto.clientId,
        });
        etape.collecteur = Object.assign(new Collecteur(), {
            id: createEtapeDto.collecteurId,
        });
        return this.etapeRepository.save(etape);
    }

    findAll() {
        return this.etapeRepository.find();
    }

    findOne(id: number) {
        return this.etapeRepository.findOne(id);
    }

    update(id: number, updateEtapeDto: UpdateEtapeDto) {
        return this.etapeRepository.update(id, updateEtapeDto);
    }

    remove(id: number) {
        return this.etapeRepository.delete(id);
    }
}
