import {Module} from '@nestjs/common';
import {TypeDechetsService} from './type-dechets.service';
import {TypeDechetsController} from './type-dechets.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeDechet} from "./entities/type-dechet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TypeDechet])],
    controllers: [TypeDechetsController],
    providers: [TypeDechetsService],
    exports: [TypeDechetsService, TypeOrmModule],
})
export class TypeDechetsModule {
}
