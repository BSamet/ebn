import {Injectable} from '@nestjs/common';
import {CreateHistoriqueDto} from './dto/create-historique.dto';
import {UpdateHistoriqueDto} from './dto/update-historique.dto';
import {Historique} from './entities/historique.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Client} from '../client/entities/client.entity';
import {Conteneur} from "../conteneur/entities/conteneur.entity";
import {Collecteur} from "../collecteur/entities/collecteur.entity";

@Injectable()
export class HistoriqueService {
    constructor(
        @InjectRepository(Historique)
        private readonly historiqueRepository: Repository<Historique>,
    ) {
    }

    create(createHistoriqueDto: CreateHistoriqueDto) {
        const historique = new Historique();
        historique.typeAction = createHistoriqueDto.typeAction;
        historique.date = createHistoriqueDto.date;
        historique.typeDeDechet = createHistoriqueDto.typeDeDechet;
        historique.commentaire = createHistoriqueDto.commentaire;
        historique.poids = createHistoriqueDto.poids;
        historique.client = Object.assign(new Client(), {
            id: createHistoriqueDto.clientId,
        });
        historique.conteneur = Object.assign(new Conteneur(), {
            id: createHistoriqueDto.conteneurId,
        });
        historique.collecteur = Object.assign(new Collecteur(), {
            id: createHistoriqueDto.collecteurId,
        });
        return this.historiqueRepository.save(historique);
    }

    findAll() {
        return this.historiqueRepository.find();
    }

    findOne(id: number) {
        return this.historiqueRepository.findOne(id);
    }

    update(id: number, updateHistoriqueDto: UpdateHistoriqueDto) {
        return this.historiqueRepository.update(id, updateHistoriqueDto);
    }

    remove(id: number) {
        return this.historiqueRepository.delete(id);
    }
}
