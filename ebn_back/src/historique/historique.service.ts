import { Injectable } from '@nestjs/common';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';
import { Historique } from './entities/historique.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { Conteneur } from '../conteneur/entities/conteneur.entity';
import { Collecteur } from '../collecteur/entities/collecteur.entity';

@Injectable()
export class HistoriqueService {
  constructor(
    @InjectRepository(Historique)
    private readonly historiqueRepository: Repository<Historique>,
  ) {}

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
    return this.historiqueRepository.findOne({
      where: {
        id: id
      }
    });
  }

  findByClient(id: number) {
    return this.historiqueRepository
      .createQueryBuilder('historique')
      .where('historique.client.id = :id', { id })
      .orderBy('historique.date', 'DESC')
      .getMany();
  }

  findByDate(dateStart: Date, dateEnd : Date) {
    console.log(dateStart);
    return this.historiqueRepository
      .createQueryBuilder('historique')
      .where('historique.date >= :dateStart' , {
        dateStart,
      })
      .andWhere(dateEnd ? 'historique.date <= :dateEnd' : '1=1', { dateEnd })
      .getMany();
      
      
  }

  async findAllHistoriquesPagination(
    take: number,
    skip: number,
    orderBy: string,
    nomCommercial: string,
    typeAction: string,
    typeDeDechet: string,
    dateStart: Date,
    dateEnd: Date,
  ) {


    // Set params for orderBy
    let params: string;
    let orderParams: any;
    switch (orderBy) {
      case 'nomCommercial': {
        params = 'client.nomCommercial';
        orderParams = 'ASC';
        break;
      }
      case 'action': {
        params = 'historique.typeAction';
        orderParams = 'ASC';
        break;
      }
      case 'typeDeDechet': {
        params = 'historique.typeDeDechet';
        orderParams = 'ASC';
        break;
      }
      case 'date': {
        params = 'historique.date';
        orderParams = 'DESC';
        break;
      }
      default: {
        params = '';
      }
    }

    const allHistoriques = await this.historiqueRepository
      .createQueryBuilder('historique')
      .leftJoinAndSelect('historique.client', 'client')
      .leftJoinAndSelect('client.utilisateur', 'utilisateur')
      .select('historique')
      .addSelect('client.nomCommercial')
      .addSelect('utilisateur.nom')
      .addSelect('utilisateur.prenom')
      .orderBy(params, orderParams)
      .where(nomCommercial ? 'client.nomCommercial = :nomCommercial' : '1=1', {
        nomCommercial,
      })
      .andWhere(typeAction ? 'historique.typeAction = :typeAction' : '1=1', {
        typeAction,
      })
      .andWhere(
        typeDeDechet ? 'historique.typeDeDechet = :typeDeDechet' : '1=1',
        {
          typeDeDechet,
        },
      )
      .andWhere(dateStart ? 'historique.date >= :dateStart' : '1=1', {
        dateStart,
      })
      .andWhere(dateEnd ? 'historique.date <= :dateEnd' : '1=1', { dateEnd })
      .take(take)
      .skip(skip)
      .getMany();

      let allHistoriquesPagination = await this.historiqueRepository
      .createQueryBuilder('historique')
      .leftJoinAndSelect('historique.client', 'client')
      .leftJoinAndSelect('client.utilisateur', 'utilisateur')
      .select('historique')
      .addSelect('client.nomCommercial')
      .addSelect('utilisateur.nom')
      .addSelect('utilisateur.prenom')
      .orderBy(params, orderParams)
      .where(nomCommercial ? 'client.nomCommercial = :nomCommercial' : '1=1', {
        nomCommercial,
      })
      .andWhere(typeAction ? 'historique.typeAction = :typeAction' : '1=1', {
        typeAction,
      })
      .andWhere(
        typeDeDechet ? 'historique.typeDeDechet = :typeDeDechet' : '1=1',
        {
          typeDeDechet,
        },
      )
      .andWhere(dateStart ? 'historique.date >= :dateStart' : '1=1', {
        dateStart,
      })
      .andWhere(dateEnd ? 'historique.date <= :dateEnd' : '1=1', { dateEnd })
      .getMany();

    const historiqueCounted = await allHistoriquesPagination.length;
    const totalPages = Math.ceil(historiqueCounted / take);


    return {
      totalPages: totalPages,
      totalHistoriques: historiqueCounted,
      historiques: allHistoriques,
    };
  }

  update(id: number, updateHistoriqueDto: UpdateHistoriqueDto) {
    return this.historiqueRepository.update(id, updateHistoriqueDto);
  }

  remove(id: number) {
    return this.historiqueRepository.delete(id);
  }
}
