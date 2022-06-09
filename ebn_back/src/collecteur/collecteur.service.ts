import { Injectable } from '@nestjs/common';
import { CreateCollecteurDto } from './dto/create-collecteur.dto';
import { UpdateCollecteurDto } from './dto/update-collecteur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collecteur } from './entities/collecteur.entity';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';

@Injectable()
export class CollecteurService {
  constructor(
    @InjectRepository(Collecteur)
    private readonly collecteurRepository: Repository<Collecteur>,
    private readonly utilisateursService: UtilisateursService,
  ) {}

  create(createCollecteurDto: CreateCollecteurDto) {
    const userDto = {
      role: createCollecteurDto.role,
      password: createCollecteurDto.password,
      nom: createCollecteurDto.nom,
      prenom: createCollecteurDto.prenom,
      mail: createCollecteurDto.mail,
      telephone: createCollecteurDto.telephone,
    };

    this.utilisateursService.create(userDto).forEach((response) => {
      const collecteur = new Collecteur();
      collecteur.numeroVelo = createCollecteurDto.numeroVelo;
      collecteur.utilisateur = Object.assign(new Utilisateur(), {
        id: response.id,
      });
      return this.collecteurRepository.save(collecteur);
    });
  }

  findAll() {
    return this.collecteurRepository.find();
  }

  findOne(id: number) {
    return this.collecteurRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findAllCollecteurPagination(take: number, skip: number) {
    const countedCollecteur = await this.collecteurRepository.count();
    const totalPages = Math.ceil(countedCollecteur / take);

    const allCollecteur = await this.collecteurRepository
      .createQueryBuilder('collecteur')
      .leftJoinAndSelect('collecteur.utilisateur', 'utilisateur')
      .select('collecteur')
      .addSelect('utilisateur.nom')
      .addSelect('utilisateur.prenom')
      .take(take)
      .skip(skip)
      .getMany();

    return {
      totalPages: totalPages,
      totalCollecteurs: countedCollecteur,
      collecteurs: allCollecteur,
    };
  }

  async findByUserMail(mail: string) {
    return await this.collecteurRepository
        .createQueryBuilder('collecteur')
        .innerJoinAndSelect('collecteur.utilisateur', 'utilisateur')
        .where('utilisateur.mail = :mail', { mail })
        .getOne();
  }

  async update(id: number, updateCollecteurDto: UpdateCollecteurDto) {
    const collecteur = {
      numeroVelo: updateCollecteurDto.numeroVelo,
    };

    const updateCollecteur = await this.collecteurRepository.update(
      id,
      collecteur,
    );

    const newCollecteur = await this.collecteurRepository.findOne({
      where: {
        id: id
      }
    });

    const user = {
      nom: updateCollecteurDto.nom,
      prenom: updateCollecteurDto.prenom,
      telephone: updateCollecteurDto.telephone,
    };

    const updateUser = await this.utilisateursService.update(
      newCollecteur.utilisateur.id,
      user,
    );

    return this.collecteurRepository.find();
  }

  remove(id: number) {
    return this.collecteurRepository.delete(id);
  }
}
