import {Injectable} from '@nestjs/common';
import {CreateRamassageAbonnementDto} from './dto/create-ramassage-abonnement.dto';
import {UpdateRamassageAbonnementDto} from './dto/update-ramassage-abonnement.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RamassageAbonnement} from "./entities/ramassage-abonnement.entity";
import {Client} from "../client/entities/client.entity";

@Injectable()
export class RamassageAbonnementService {
    constructor(
        @InjectRepository(RamassageAbonnement)
        private readonly ramassageAbonnementRepository: Repository<RamassageAbonnement>,
    ) {
    }

    create(createRamassageAbonnementDto: CreateRamassageAbonnementDto) {
        const ramassageAbonnement = new RamassageAbonnement();
        ramassageAbonnement.dateReference = createRamassageAbonnementDto.dateReference;
        ramassageAbonnement.periodicite = createRamassageAbonnementDto.periodicite;
        ramassageAbonnement.client = Object.assign(new Client(), {
            id: createRamassageAbonnementDto.clientid,
        });
        return this.ramassageAbonnementRepository.save(ramassageAbonnement);
    }

    findAll() {
        return this.ramassageAbonnementRepository.find();
    }

    findOne(id: number) {
        return this.ramassageAbonnementRepository.findOne(id);
    }

    update(id: number, updateRamassageAbonnementDto: UpdateRamassageAbonnementDto) {
        return this.ramassageAbonnementRepository.update(id, updateRamassageAbonnementDto);
    }

    remove(id: number) {
        return this.ramassageAbonnementRepository.delete(id);
    }
}
