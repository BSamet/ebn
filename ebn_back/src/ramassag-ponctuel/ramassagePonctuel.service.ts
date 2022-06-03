import { Injectable } from '@nestjs/common';
import { CreateRamassagePonctuelDto } from './dto/create-ramassagePonctuel.dto';
import { UpdateRamassagePonctuelDto } from './dto/update-ramassagePonctuel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RamassagePonctuel } from './entities/ramassagePonctuel.entity';
import { Client } from '../client/entities/client.entity';

@Injectable()
export class RamassagePonctuelService {
  constructor(
    @InjectRepository(RamassagePonctuel)
    private readonly ramassagePonctuelRepository: Repository<RamassagePonctuel>,
  ) {}

  create(createRamassageDto: CreateRamassagePonctuelDto) {
    const ramassage = new RamassagePonctuel();
    ramassage.date = createRamassageDto.date;
    ramassage.client = Object.assign(new Client(), {
      id: createRamassageDto.clientId,
    });
    return this.ramassagePonctuelRepository.save(ramassage);
  }

  findAll() {
    return this.ramassagePonctuelRepository.find();
  }

  findOne(id: number) {
    return this.ramassagePonctuelRepository.findOne({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateRamassagePonctuelDto: UpdateRamassagePonctuelDto) {
    return this.ramassagePonctuelRepository.update(
      id,
      updateRamassagePonctuelDto,
    );
  }

  remove(id: number) {
    return this.ramassagePonctuelRepository.delete(id);
  }
}
