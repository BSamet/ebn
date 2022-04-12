import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const client = new Client();
    client.nom = createClientDto.nom;
    client.prenom = createClientDto.prenom;
    client.mail = createClientDto.mail;
    client.telephone = createClientDto.telephone;
    client.siret = createClientDto.siret;
    client.nomCommercial = createClientDto.nomCommercial;
    client.adresse = createClientDto.adresse;
    client.typeDeDechets = createClientDto.typeDeDechets;
    return this.clientRepository.save(client);
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: number) {
    return this.clientRepository.findOne(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
