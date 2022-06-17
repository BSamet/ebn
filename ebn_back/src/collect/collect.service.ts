import {Injectable} from '@nestjs/common';
import {CreateCollectDto} from './dto/create-collect.dto';
import {UpdateCollectDto} from './dto/update-collect.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Collect} from "./entities/collect.entity";
import {Client} from "../client/entities/client.entity"
import {Etape} from "../etape/entities/etape.entity";

const parser = require('cron-parser');

export interface collectInterface {
    id: number | null;
    refDate: Date,
    Client: {
        id: number,
        nomCommercial: string,
        adresse: string,
        Utilisateur: {
            nom: string,
            prenom: string
        },
    },
    isSubscribe: boolean
}


@Injectable()
export class CollectService {

    constructor(
        @InjectRepository(Collect)
        private readonly collectRepository: Repository<Collect>,
        @InjectRepository(Etape)
        private readonly etapeRepository: Repository<Etape>,
    ) {
    }

    async create(createCollectDto: CreateCollectDto) {
        const collect = new Collect();

        if (createCollectDto.isSubscribe) {
            // Génération du CRON via la date
            const checkDateHours = new Date(createCollectDto.refDate);
            const timeSlot = checkDateHours.getHours();
            const allDays = createCollectDto.days

            let cronGenerate = "0 " + timeSlot + " * * " + allDays + ",";
            collect.cronExpression = cronGenerate.replace(/,\s*$/, "");
        }
        collect.refDate = createCollectDto.refDate;
        collect.client = Object.assign(new Client(), {
            id: createCollectDto.clientId,
        });
        return this.collectRepository.save(collect);
    }

    findAll() {
        return this.collectRepository.find();
    }

    findOne(id: number) {
        return this.collectRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async findAllByDate(date: Date) {
        // Récupération de la liste des étapes pour vérifié si la collecte à déjà été programmé
        const allStepObjectForCheck = await this.getStepArray();

        // Récupération de la liste des collect en abonnement
        const allCollectSubscribe = await this.collectRepository
            .createQueryBuilder('collect')
            .leftJoinAndSelect('collect.client', 'client')
            .leftJoinAndSelect('client.utilisateur', 'utilisateur')
            .select('collect')
            .addSelect('client.id')
            .addSelect('client.nomCommercial')
            .addSelect('client.adresse')
            .addSelect('utilisateur.nom')
            .addSelect('utilisateur.prenom')
            .where("collect.cronExpression != ''")
            .getMany();

        // C'est ici que la magie va opéré pour renvoyer une liste des prochaines collecte des abonnements
        const subscribeArray = await this.getNextIntervalCollecte(allCollectSubscribe, date, allStepObjectForCheck)

        // Récupération de la liste des collect en non abonnement
        const allCollectNotSubscribe = await this.collectRepository
            .createQueryBuilder('collect')
            .leftJoinAndSelect('collect.client', 'client')
            .leftJoinAndSelect('client.utilisateur', 'utilisateur')
            .select('collect')
            .addSelect('client.id')
            .addSelect('client.nomCommercial')
            .addSelect('client.adresse')
            .addSelect('utilisateur.nom')
            .addSelect('utilisateur.prenom')
            .where("collect.cronExpression IS NULL")
            .getMany();

        // Et c'est également ici que la magie va opéré pour renvoyer une liste des prochaines collecte ponctuelle
        const notSubscribeArray = this.checkOneTimeCollect(date, allCollectNotSubscribe, allStepObjectForCheck, subscribeArray)

        return notSubscribeArray;
    }

    update(id: number, updateCollectDto: UpdateCollectDto) {
        return this.collectRepository.update(
            id,
            updateCollectDto,
        );
    }

    remove(id: number) {
        return this.collectRepository.delete(id);
    }

    async getNextIntervalCollecte(collects: Array<Collect>, date: Date, allStepObjectForCheck: Etape[]) {
        // -- Cette fonction va nous parser le cron qui est dans la table collect et gerer les intervales pour crée une liste --

        // On initialise une table
        let myAwesomeCollectObject = [];

        // On met les bases de nos date
        let currentDay = new Date();
        let futureDay = new Date().setDate(currentDay.getDate() + 31)
        let futureDayFormated = new Date(futureDay);

        // On initialise les option du parser
        let parserOption = {
            endDate: futureDayFormated,
            iterator: true,
            utc: true,
            currentDate: null
        };


        await collects.forEach((subscribe) => {
            parserOption.currentDate = new Date(subscribe.refDate);
            try {

                // On parse
                let intervalSubscribe = parser.parseExpression(subscribe.cronExpression, parserOption);

                while (true) {
                    try {
                        let obj = intervalSubscribe.next();
                        // Si le paramètre date existe on demande à nous retourner les dates qui sont égale au paramètre et uniquement ceux qui ne sont pas existant dans la table étape
                        if (date) {
                            if (this.dateEquals(obj.value, date) && !this.hasEqualDateAndSameClient(allStepObjectForCheck, new Date(obj.value), subscribe.client.id)) {
                                myAwesomeCollectObject.push(this.setSubscribeToPush(obj.value, subscribe.client))
                            }
                        } else {
                            // Si le paramètre date n'existe on demande à nous retourner les dates supérieur à la date d'aujourd'hui et uniquement ceux qui ne sont pas existant dans la table étape
                            if (this.dateSup(obj.value, currentDay) && !this.hasEqualDateAndSameClient(allStepObjectForCheck, new Date(obj.value), subscribe.client.id)) {
                                myAwesomeCollectObject.push(this.setSubscribeToPush(obj.value, subscribe.client))
                            }
                        }
                    } catch
                        (e) {
                        break;
                    }
                }
            } catch
                (err) {
                console.log('Error: ' + err.message);
            }
        })
        return myAwesomeCollectObject;
    }

    async getStepArray() {
        return await this.etapeRepository
            .createQueryBuilder('etape')
            .leftJoinAndSelect('etape.client', 'client')
            .getMany();
    }

    hasEqualDateAndSameClient(steps: Etape[], refDate: Date, clientId: number) {
        let match = false;
        for (let i = 0; i < steps.length; i++) {
            if (this.dateEquals(steps[i].date, refDate) && steps[i].client.id === clientId) {
                match = true;
                break;
            }
        }
        return match;
    }

    setSubscribeToPush(date: Date, client: Client): collectInterface {
        return {
            id: null,
            refDate: new Date(date),
            Client: {
                id: client.id,
                nomCommercial: client.nomCommercial,
                adresse: client.adresse,
                Utilisateur: {
                    nom: client.utilisateur.nom,
                    prenom: client.utilisateur.prenom
                },
            },
            isSubscribe: true
        }
    }

    setCollectToPush(collect: Collect): collectInterface {
        return {
            id: collect.id,
            refDate: collect.refDate,
            Client: {
                id: collect.client.id,
                nomCommercial: collect.client.nomCommercial,
                adresse: collect.client.adresse,
                Utilisateur: {
                    nom: collect.client.utilisateur.nom,
                    prenom: collect.client.utilisateur.prenom
                },
            },
            isSubscribe: false
        }
    }

    dateEquals(sourceDate: Date, targetDate: Date): boolean {
        let targetToFormate = new Date(targetDate)

        const targetDay = String(targetToFormate.getDate()).padStart(2, '0');
        const targetMonth = String(targetToFormate.getMonth() + 1).padStart(2, '0');
        const targetYear = targetToFormate.getFullYear();

        const today = targetYear + '-' + targetMonth + '-' + targetDay + 'T00:00:00.000';
        const tomorrow = targetYear + '-' + targetMonth + '-' + targetDay + 'T23:59:59.000';
        
        return new Date(sourceDate).toString() > new Date(today).toString() && new Date(sourceDate).toString() < new Date(tomorrow).toString();
    }

    dateSup(sourceDate: Date, targetDate: Date): boolean {
        return new Date(sourceDate) > new Date(targetDate);
    }

    dateInf(sourceDate: Date, targetDate: Date): boolean {
        return new Date(sourceDate) < new Date(targetDate);
    }

    // TODO Faire une fonction unique pour les abonnement et les collecte ponctuelle, ligne 150 & 238
    checkOneTimeCollect(dateParam: Date, collect: Collect[], stepArrayForCheck: Etape[], arrayToPush: collectInterface[]) {
        // On fait la même chose que du côté abonnement mais pour les collecte unique
        let currentDay = new Date();
        let futureDay = new Date().setDate(currentDay.getDate() + 31)
        let futureDayFormated = new Date(futureDay);

        let pushInArray = arrayToPush;

        for (let i = 0; i < collect.length; i++) {
            if (dateParam) {
                if (this.dateEquals(collect[i].refDate, dateParam) && !this.hasEqualDateAndSameClient(stepArrayForCheck, new Date(collect[i].refDate), collect[i].client.id)) {
                    arrayToPush.push(this.setCollectToPush(collect[i]))
                }
            } else {
                if (this.dateSup(collect[i].refDate, currentDay) && this.dateInf(collect[i].refDate, futureDayFormated) && !this.hasEqualDateAndSameClient(stepArrayForCheck, new Date(collect[i].refDate), collect[i].client.id)) {
                    arrayToPush.push(this.setCollectToPush(collect[i]))
                }
            }
        }
        return pushInArray;
    }

}