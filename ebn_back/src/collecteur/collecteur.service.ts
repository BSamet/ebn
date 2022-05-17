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
    return this.collecteurRepository.findOne(id);
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

  update(id: number, updateCollecteurDto: UpdateCollecteurDto) {
    return this.collecteurRepository.update(id, updateCollecteurDto);
  }

  remove(id: number) {
    return this.collecteurRepository.delete(id);
  }
}
