import {Test, TestingModule} from '@nestjs/testing';
import {ClientController} from './client.controller';
import {ClientService} from './client.service';
import {Client} from './entities/client.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {CreateClientDto} from "./dto/create-client.dto";
import axios from "axios";

describe('ClientController', () => {
    let controller: ClientController;
    let service: ClientService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClientController],
            providers: [
                ClientService,
                {provide: getRepositoryToken(Client), useValue: {}},
            ],
        }).compile();

        controller = module.get<ClientController>(ClientController);
        service = module.get<ClientService>(ClientService);
    });

    it('Should create one client', async () => {
        //arrange
        const client = new CreateClientDto();
        client.siret = 1520498805;
        client.nomCommercial = 'french';
        client.adresse = '1 rue des adresse, 11111 Add';

        //act + assert
        await axios({
            method: 'post',
            url: 'http://localhost:5454/client',
            data: client,
        })
            .then((response) => {
                expect(response.status).toStrictEqual(201);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });
});
