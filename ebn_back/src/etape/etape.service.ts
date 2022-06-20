import {Injectable} from '@nestjs/common';
import {CreateEtapeDto} from './dto/create-etape.dto';
import {UpdateEtapeDto} from './dto/update-etape.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Client} from '../client/entities/client.entity';
import {getConnection, Repository} from 'typeorm';
import {Etape} from './entities/etape.entity';
import {Collecteur} from '../collecteur/entities/collecteur.entity';
import {Utilisateur} from 'src/utilisateurs/entities/utilisateur.entity';
import {Historique} from 'src/historique/entities/historique.entity';
import {HistoriqueService} from 'src/historique/historique.service';

@Injectable()
export class EtapeService {
    historiqueRepository: any;

    constructor(
        @InjectRepository(Etape)
        private readonly etapeRepository: Repository<Etape>,
        private historiqueService: HistoriqueService,
    ) {
    }

    create(createEtapeDto: CreateEtapeDto) {
        const etape = new Etape();
        etape.isCollected = createEtapeDto.isCollected;
        etape.isAssigned = createEtapeDto.isAssigned;
        etape.date = createEtapeDto.date;
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
        return this.etapeRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findAllOfTheDay(
        take: number,
        skip: number,
    ){
        const dateNow = new Date();

        const dd = String(dateNow.getDate()).padStart(2, '0');
        const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
        const yyyy = dateNow.getFullYear();

        const today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000';
        const tomorrow = yyyy + '-' + mm + '-' + dd + 'T23:59:59.000';

        const allEtapesPagination = await this.etapeRepository
            .createQueryBuilder('etape')
            .innerJoinAndSelect('etape.client', 'c')
            .innerJoinAndSelect('c.utilisateur', 'u')
            .innerJoinAndSelect('etape.collecteur', 'col')
            .innerJoinAndSelect('col.utilisateur', 'uCol')
            .andWhere('etape.date >= :today', {today})
            .andWhere('etape.date <= :tomorrow', {tomorrow})
            .orderBy('etape.date', "ASC")
            .take(take)
            .skip(skip)
            .getMany();

        const allEtapes = await this.etapeRepository
            .createQueryBuilder('etape')
            .innerJoinAndSelect('etape.client', 'c')
            .innerJoinAndSelect('c.utilisateur', 'u')
            .innerJoinAndSelect('etape.collecteur', 'col')
            .innerJoinAndSelect('col.utilisateur', 'uCol')
            .andWhere('etape.date >= :today', {today})
            .andWhere('etape.date <= :tomorrow', {tomorrow})
            .orderBy('etape.date', "ASC")
            .getMany();

        const etapesCounted = await allEtapes.length;
        const totalPages = Math.ceil(etapesCounted / take);


        return {
            totalPages: totalPages,
            totalEtapes: etapesCounted,
            etapes: allEtapesPagination,
        };
    }

    findByCollecteur(id: number) {
        const dateNow = new Date();

        const dd = String(dateNow.getDate()).padStart(2, '0');
        const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
        const yyyy = dateNow.getFullYear();

        const today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000';
        const tomorrow = yyyy + '-' + mm + '-' + dd + 'T23:59:59.000';

        return this.etapeRepository
            .createQueryBuilder('etape')
            .innerJoinAndSelect('etape.client', 'c')
            .innerJoinAndSelect('c.utilisateur', 'u')
            .innerJoinAndSelect('etape.collecteur', 'col')
            .innerJoinAndSelect('col.utilisateur', 'uCol')
            .where('etape.collecteur.id = :id', {id})
            .andWhere('etape.date >= :today', {today})
            .andWhere('etape.date <= :tomorrow', {tomorrow})
            .orderBy('etape.date', "ASC")
            .getMany();
    }


    async findByCollecteurAndDate(
        take: number,
        skip: number,
        id: number, 
        date: string, 
        limitDate: string
    ){
        const allEtapesPagination = await this.etapeRepository
            .createQueryBuilder('etape')
            .innerJoinAndSelect('etape.client', 'c')
            .innerJoinAndSelect('c.utilisateur', 'u')
            .innerJoinAndSelect('etape.collecteur', 'col')
            .innerJoinAndSelect('col.utilisateur', 'uCol')
            .where(id ? 'etape.collecteur.id = :id' : '1=1', {id})
            .andWhere(date ? 'etape.date >= :date' : '1=1', {date})
            .andWhere(limitDate ? 'etape.date <= :limitDate' : '1=1', {limitDate})
            .orderBy('etape.date', "ASC")
            .take(take)
            .skip(skip)
            .getMany();

        const allEtapes = await this.etapeRepository
            .createQueryBuilder('etape')
            .innerJoinAndSelect('etape.client', 'c')
            .innerJoinAndSelect('c.utilisateur', 'u')
            .innerJoinAndSelect('etape.collecteur', 'col')
            .innerJoinAndSelect('col.utilisateur', 'uCol')
            .where(id ? 'etape.collecteur.id = :id' : '1=1', {id})
            .andWhere(date ? 'etape.date >= :date' : '1=1', {date})
            .andWhere(limitDate ? 'etape.date <= :limitDate' : '1=1', {limitDate})
            .orderBy('etape.date', "ASC")
            .getMany();
        
            const etapesCounted = await allEtapes.length;
            const totalPages = Math.ceil(etapesCounted / take);


        return {
            totalPages: totalPages,
            totalEtapes: etapesCounted,
            etapes: allEtapesPagination,
        };
    }

    async findByClient(id: number) {
        const dateNow = new Date();

        const dd = String(dateNow.getDate()).padStart(2, '0');
        const mm = String(dateNow.getMonth() + 1).padStart(2, '0');
        const yyyy = dateNow.getFullYear();

        const today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000';

        const historique = await this.historiqueService.findByClient(+id);

    const etape = await this.etapeRepository
      .createQueryBuilder('etape')
      .innerJoinAndSelect('etape.client', 'c')
      .innerJoinAndSelect('c.utilisateur', 'u')
      .innerJoinAndSelect('etape.collecteur', 'col')
      .innerJoinAndSelect('col.utilisateur', 'uCol')
      .where('c.id = :id', { id })
      .andWhere('etape.date >= :today', { today })
      .getMany();

    return {
      historique: historique,
      etape: etape,
    };
  }

    update(id: number, updateEtapeDto: UpdateEtapeDto) {
        return this.etapeRepository.update(id, updateEtapeDto);
    }

    remove(id: number) {
        return this.etapeRepository.delete(id);
    }
}
