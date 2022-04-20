import {Module} from '@nestjs/common';
import {RamassageAbonnementService} from './ramassage-abonnement.service';
import {RamassageAbonnementController} from './ramassage-abonnement.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RamassageAbonnement} from "./entities/ramassage-abonnement.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RamassageAbonnement])],
    controllers: [RamassageAbonnementController],
    providers: [RamassageAbonnementService],
    exports: [RamassageAbonnementService, TypeOrmModule],
})
export class RamassageAbonnementModule {
}
