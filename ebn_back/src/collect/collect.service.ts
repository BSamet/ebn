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

            // let currentDay = new Date();
            // let futureDay = new Date().setDate(currentDay.getDate() + 2)
            // let futureDayFormated = new Date(futureDay);
            //
            // var options = {
            //     currentDate: checkDateHours,
            //     endDate: futureDayFormated,
            //     iterator: true,
            //     utc: true
            // };
            //
            // try {
            //     let interval = parser.parseExpression(str, options);
            //
            //     while (true) {
            //         try {
            //             let obj = interval.next();
            //             if (new Date(obj.value) > currentDay) {
            //                 console.log("day", new Date(obj.value));
            //             }
            //         } catch (e) {
            //             break;
            //         }
            //     }
            // } catch (err) {
            //     console.log('Error: ' + err.message);
            // }
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
        const allCollect = await this.collectRepository
            .createQueryBuilder('collect')
            .leftJoinAndSelect('collect.client', 'client')
            .leftJoinAndSelect('client.utilisateur', 'utilisateur')
            .andWhere(date ? 'collect.refDate >= :date' : '1=1', {date})
            .getMany();

        console.log(allCollect)
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
