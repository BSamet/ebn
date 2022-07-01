import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Collect} from "./entities/collect.entity";
import {UtilisateursModule} from "../utilisateurs/utilisateurs.module";
import {EtapeModule} from "../etape/etape.module";
import {ClientModule} from "../client/client.module";

@Module({
  imports: [TypeOrmModule.forFeature([Collect]), UtilisateursModule, EtapeModule, ClientModule],
  controllers: [CollectController],
  providers: [CollectService],
  exports: [CollectService, TypeOrmModule]
})
export class CollectModule {}
