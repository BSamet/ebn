import {Injectable} from '@nestjs/common';
import {CreateCollectDto} from './dto/create-collect.dto';
import {UpdateCollectDto} from './dto/update-collect.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Collect} from "./entities/collect.entity";
import {Client} from "../client/entities/client.entity"
import {Etape} from "../etape/entities/etape.entity";
import {Utilisateur} from "../utilisateurs/entities/utilisateur.entity";

const parser = require('cron-parser');


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
        const allCollectSubscribe = await this.collectRepository
            .createQueryBuilder('collect')
            .leftJoinAndSelect('collect.client', 'client')
            .leftJoinAndSelect('client.utilisateur', 'utilisateur')
            .select('collect')
            .addSelect('client.id')
            .addSelect('client.nomCommercial')
            .addSelect('utilisateur.nom')
            .addSelect('utilisateur.prenom')
            .where("collect.cronExpression != ''")
            .getMany();


        const subscribeArray = await this.getNextIntervalCollecte(allCollectSubscribe, date)

        const allCollectNotSubscribe = await this.collectRepository
            .createQueryBuilder('collect')
            .leftJoinAndSelect('collect.client', 'client')
            .leftJoinAndSelect('client.utilisateur', 'utilisateur')
            .select('collect')
            .addSelect('client.id')
            .addSelect('client.nomCommercial')
            .addSelect('utilisateur.nom')
            .addSelect('utilisateur.prenom')
            .where("collect.cronExpression = ''")
            .getMany();

        allCollectNotSubscribe.forEach((collect) => {
            subscribeArray.push(this.setCollectToPush(collect))
        })
        console.log(subscribeArray)
        return null;
    }


    update(id
               :
               number, updateCollectDto
               :
               UpdateCollectDto
    ) {
        return this.collectRepository.update(
            id,
            updateCollectDto,
        );
    }

    remove(id: number) {
        return this.collectRepository.delete(id);
    }

    async getNextIntervalCollecte(collects: Array<Collect>, date: Date) {
        let myAwesomeCollectObject = [];

        let currentDay = new Date();
        let futureDay = new Date().setDate(currentDay.getDate() + 31)
        let futureDayFormated = new Date(futureDay);

        let parserOption = {
            endDate: futureDayFormated,
            iterator: true,
            utc: true,
            currentDate: null
        };

        const myAwesomeStepObject = await this.checkIfCollectIsInStep();


        await collects.forEach((subscribe) => {
            parserOption.currentDate = new Date(subscribe.refDate);
            try {
                let intervalSubscribe = parser.parseExpression(subscribe.cronExpression, parserOption);

                while (true) {
                    try {
                        let obj = intervalSubscribe.next();

                        if (date) {
                            if (this.dateEquals(obj.value, date) && !this.hasEqualDateAndSameClient(myAwesomeStepObject, new Date(obj.value), subscribe.client.id)) {
                                myAwesomeCollectObject.push(this.setSubscribeToPush(obj.value, subscribe.client))
                            }
                        } else {
                            if (this.dateSup(obj.value, currentDay) && !this.hasEqualDateAndSameClient(myAwesomeStepObject, new Date(obj.value), subscribe.client.id)) {
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

    async checkIfCollectIsInStep() {
        return await this.etapeRepository
            .createQueryBuilder('etape')
            .leftJoinAndSelect('etape.client', 'client')
            .getMany();
    }

    hasEqualDateAndSameClient(steps: Etape[], refDate: Date, clientId: number) {
        let match = false;
        for(let i = 0; i < steps.length; i++) {
            if(this.dateEquals(steps[i].date, refDate) && steps[i].client.id === clientId) {
                match = true;
                break;
            }
        }
        return match;
    }

    setSubscribeToPush(date: Date, client: Client) {
        return {
            id: null,
            refDate: new Date(date),
            Client: {
                id: client.id,
                nomCommercial: client.nomCommercial,
            },
            Utilisateur: {
                nom: client.utilisateur.nom,
                prenom: client.utilisateur.prenom
            },
            isSubscribe: true
        }
    }

    setCollectToPush(collect: Collect) {
        return {
            id: collect.id,
            refDate: collect.refDate,
            Client: {
                id: collect.client.id,
                nomCommercial: collect.client.nomCommercial,
            },
            Utilisateur: {
                nom: collect.client.utilisateur.nom,
                prenom: collect.client.utilisateur.prenom
            },
            isSubscribe: false
        }
    }

    dateEquals(sourceDate: Date, targetDate: Date): boolean {
        return new Date(sourceDate).toString() === new Date(targetDate).toString();
    }

    dateSup(sourceDate: Date, targetDate: Date): boolean {
        return new Date(sourceDate) > new Date(targetDate);
    }
}