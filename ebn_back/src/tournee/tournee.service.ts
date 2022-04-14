import { Injectable } from '@nestjs/common';
import { CreateTourneeDto } from './dto/create-tournee.dto';
import { UpdateTourneeDto } from './dto/update-tournee.dto';
import { Tournee } from './entities/tournee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collecteur } from '../collecteur/entities/collecteur.entity';

@Injectable()
export class TourneeService {
  constructor(
    @InjectRepository(Tournee)
    private readonly tourneeRepository: Repository<Tournee>,
  ) {}

  create(createTourneeDto: CreateTourneeDto) {
    const tournee = new Tournee();
    tournee.collecteur = Object.assign(new Collecteur(), {
      id: createTourneeDto.collecteurId,
    });
    return this.tourneeRepository.save(tournee);
  }

  findAll() {
    return this.tourneeRepository.find();
  }

  findOne(id: number) {
    return this.tourneeRepository.findOne(id);
  }

  update(id: number, updateTourneeDto: UpdateTourneeDto) {
    return this.tourneeRepository.update(id, updateTourneeDto);
  }

  remove(id: number) {
    return this.tourneeRepository.delete(id);
  }
}
