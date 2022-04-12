import { Injectable } from '@nestjs/common';
import { CreateRamassageDto } from './dto/create-ramassage.dto';
import { UpdateRamassageDto } from './dto/update-ramassage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ramassage } from './entities/ramassage.entity';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class RamassageService {
  constructor(
    @InjectRepository(Ramassage)
    private readonly ramassageRepository: Repository<Ramassage>,
  ) {}

  create(createRamassageDto: CreateRamassageDto) {
    const ramassage = new Ramassage();
    ramassage.date = createRamassageDto.date;
    ramassage.client = Object.assign(new Client(), {
      id: createRamassageDto.clientId,
    });
    return this.ramassageRepository.save(ramassage);
  }

  findAll() {
    return this.ramassageRepository.find();
  }

  findOne(id: number) {
    return this.ramassageRepository.findOne(id);
  }

  update(id: number, updateRamassageDto: UpdateRamassageDto) {
    return this.ramassageRepository.update(id, updateRamassageDto);
  }

  remove(id: number) {
    return this.ramassageRepository.delete(id);
  }
}
