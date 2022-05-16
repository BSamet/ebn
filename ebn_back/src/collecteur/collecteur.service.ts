import { Injectable } from '@nestjs/common';
import { CreateCollecteurDto } from './dto/create-collecteur.dto';
import { UpdateCollecteurDto } from './dto/update-collecteur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collecteur } from './entities/collecteur.entity';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';

@Injectable()
export class CollecteurService {
  constructor(
    @InjectRepository(Collecteur)
    private readonly collecteurRepository: Repository<Collecteur>,
  ) {}

  create(createCollecteurDto: CreateCollecteurDto) {
    const collecteur = new Collecteur();
    collecteur.numeroVelo = createCollecteurDto.numeroVelo;
    collecteur.utilisateur = Object.assign(new Utilisateur(), {
      id: createCollecteurDto.utilisateurId,
    });
    return this.collecteurRepository.save(collecteur);
  }

  findAll() {
    return this.collecteurRepository.find();
  }

  findOne(id: number) {
    return this.collecteurRepository.findOne(id);
  }

  update(id: number, updateCollecteurDto: UpdateCollecteurDto) {
    return this.collecteurRepository.update(id, updateCollecteurDto);
  }

  remove(id: number) {
    return this.collecteurRepository.delete(id);
  }
}
