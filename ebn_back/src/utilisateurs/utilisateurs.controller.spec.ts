import {UtilisateursController} from './utilisateurs.controller';
import {UtilisateursService} from "./utilisateurs.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Utilisateur} from "./entities/utilisateur.entity";
import {CreateUtilisateurDto} from "./dto/create-utilisateur.dto";
import axios from "axios";

describe('UtilisateursController', () => {
    let controller: UtilisateursController;
    let service: UtilisateursService;
    let userId: number;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UtilisateursController],
            providers: [
                UtilisateursService,
                {provide: getRepositoryToken(Utilisateur), useValue: {}},
            ],
        }).compile();

        controller = module.get<UtilisateursController>(UtilisateursController);
        service = module.get<UtilisateursService>(UtilisateursService);
    });

    it('Should create one user', async () => {
        //arrange
        const user = new CreateUtilisateurDto();
        user.role = 'Client';
        user.utilisateur = 'MarcoLeResto';
        user.password = '.123azerty123.';
        user.nom = 'Lorenzo';
        user.prenom = 'Marco';
        user.mail = 'lorenzo_marco@gmail.com';
        user.telephone = '1234567890';

        //act + assert
        await axios({
            method: 'post',
            url: 'http://localhost:5454/utilisateurs',
            data: user,
        })
            .then((response) => {
                expect(response.status).toStrictEqual(201);
                userId = response.data.id;
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Should get all user', async () => {
        //act + assert
        await axios({
            method: 'get',
            url: 'http://localhost:5454/utilisateurs',
        })
            .then((response) => {
                expect(response.status).toStrictEqual(200);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Should get one user', async () => {
        //act + assert
        await axios({
            method: 'get',
            url: 'http://localhost:5454/utilisateurs/' + userId,
        })
            .then((response) => {
                expect(response.status).toStrictEqual(200);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Should patch one user', async () => {
        //arrange
        const user = new CreateUtilisateurDto();
        user.utilisateur = 'MarcoLePolo';

        //act + assert
        await axios({
            method: 'patch',
            url: 'http://localhost:5454/utilisateurs/' + userId,
            data: user
        })
            .then((response) => {
                expect(response.status).toStrictEqual(200);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });

    it('Should delete one user', async () => {
        //act + assert
        await axios({
            method: 'delete',
            url: 'http://localhost:5454/utilisateurs/' + userId,
        })
            .then((response) => {
                expect(response.status).toStrictEqual(200);
            })
            .catch((err) => {
                throw new Error(err);
            });
    });
});
