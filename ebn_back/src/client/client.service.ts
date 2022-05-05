import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { TypeDechet } from '../type-dechets/entities/type-dechet.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const client = new Client();
    client.siret = createClientDto.siret;
    client.nomCommercial = createClientDto.nomCommercial;
    client.adresse = createClientDto.adresse;
    client.utilisateur = Object.assign(new Utilisateur(), {
      id: createClientDto.utilisateurId,
    });
    client.typeDechet = [
      Object.assign(new TypeDechet(), {
        id: createClientDto.typeDechetsId,
      }),
    ];
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
