import {Injectable} from '@nestjs/common';
import {CreateCollectDto} from './dto/create-collect.dto';
import {UpdateCollectDto} from './dto/update-collect.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Collect} from "./entities/collect.entity";
import { Client } from "../client/entities/client.entity"
const parser = require('cron-parser');


@Injectable()
export class CollectService {
    constructor(
        @InjectRepository(Collect)
        private readonly collectRepository: Repository<Collect>,
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

    async findAllByDate(date: Date){
        console.log(date)
        let myAwesomeCollectObject= [];

        const allCollectSubscribe = await this.collectRepository
            .createQueryBuilder('collect')
            .leftJoinAndSelect('collect.client', 'client')
            .leftJoinAndSelect('client.utilisateur', 'utilisateur')
            .select('collect')
            .addSelect('client.id')
            .where("collect.cronExpression != ''")
            .andWhere(date ? 'collect.refDate >= :date' : '1=1', {date})
            .getMany();

        let currentDay = new Date();
        let futureDay = new Date().setDate(currentDay.getDate() + 31)
        let futureDayFormated = new Date(futureDay);

        allCollectSubscribe.forEach((subscribe) => {
            let parserOption = {
                currentDate: new Date(subscribe.refDate),
                endDate: futureDayFormated,
                iterator: true,
                utc: true
            };

            try {
                let intervalSubscribe = parser.parseExpression(subscribe.cronExpression, parserOption);
                while (true) {
                    try {
                        let obj = intervalSubscribe.next();
                        if (date != undefined) {
                            if (new Date(obj.value) == date) {
                                let toPushInObject = {
                                    refDate: new Date(obj.value),
                                    client: subscribe.client,
                                    isSubscribe: true
                                }
                                myAwesomeCollectObject.push(toPushInObject)
                            }
                        }
                        else if (new Date(obj.value) > currentDay) {
                            // console.log("day", new Date(obj.value));
                            let toPushInObject = {
                                refDate: new Date(obj.value),
                                client: subscribe.client,
                                isSubscribe: true
                            }
                            myAwesomeCollectObject.push(toPushInObject)
                        }
                    } catch (e) {
                        break;
                    }
                }
            } catch (err) {
                console.log('Error: ' + err.message);
            }
        })
        // console.log(myAwesomeCollectObject)
        return null;
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
}
