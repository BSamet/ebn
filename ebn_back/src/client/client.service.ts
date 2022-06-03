import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { Utilisateur } from '../utilisateurs/entities/utilisateur.entity';
import { TypeDechet } from '../type-dechets/entities/type-dechet.entity';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly utilisateursService: UtilisateursService,
  ) {}

  create(createClientDto: CreateClientDto) {
    const userDto = {
      role: createClientDto.role,
      password: createClientDto.password,
      nom: createClientDto.nom,
      prenom: createClientDto.prenom,
      mail: createClientDto.mail,
      telephone: createClientDto.telephone,
    };

    this.utilisateursService.create(userDto).forEach((response) => {
      const client = new Client();
      client.siret = createClientDto.siret;
      client.nomCommercial = createClientDto.nomCommercial;
      client.adresse = createClientDto.adresse;
      client.utilisateur = Object.assign(new Utilisateur(), {
        id: response.id,
      });
      client.typeDechet = [
        Object.assign(new TypeDechet(), {
          id: createClientDto.typeDechetsId,
        }),
      ];
      
        return this.clientRepository.save(client);
     
    });
  }

  findAll() {
    return this.clientRepository.find();
  }

  findOne(id: number) {
    return this.clientRepository.findOne(id);
  }

  async findAllClientPagination(take: number, skip: number) {
    const countedClient = await this.clientRepository.count();
    const totalPages = Math.ceil(countedClient / take);

    const allClient = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.utilisateur', 'utilisateur')
      .leftJoinAndSelect('client.typeDechet', 'typeDechet')
      .select('client')
      .addSelect('utilisateur.nom')
      .addSelect('utilisateur.prenom')
      .addSelect('utilisateur.telephone')
      .addSelect('typeDechet.typeDechets')
      .take(take)
      .skip(skip)
      .getMany();

    return {
      totalPages: totalPages,
      totalClients: countedClient,
      clients: allClient,
    };
  }

  async findByUserMail(mail: string) {
    return await this.clientRepository
        .createQueryBuilder('client')
        .innerJoinAndSelect('client.utilisateur', 'utilisateur')
        .where('utilisateur.mail = :mail', { mail })
        .getOne();
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = {
      siret: updateClientDto.siret,
      nomCommercial: updateClientDto.nomCommercial,
      adresse: updateClientDto.adresse,
    };
    const updatedClient = await this.clientRepository.update(id, client);

    const newClient = await this.clientRepository.findOne(id);

    const user = {
      nom: updateClientDto.nom,
      prenom: updateClientDto.prenom,
      telephone: updateClientDto.telephone,
    };

    const updateUser = await this.utilisateursService.update(
        newClient.utilisateur.id,
        user,
    );

    return this.clientRepository.find();
  }

  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
