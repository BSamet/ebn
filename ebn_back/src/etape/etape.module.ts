import {Module} from '@nestjs/common';
import {EtapeService} from './etape.service';
import {EtapeController} from './etape.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Etape} from "./entities/etape.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Etape])],
    controllers: [EtapeController],
    providers: [EtapeService],
    exports: [EtapeService, TypeOrmModule],
})
export class EtapeModule {
}
