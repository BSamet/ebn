import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Collect} from "./entities/collect.entity";
import {UtilisateursModule} from "../utilisateurs/utilisateurs.module";

@Module({
  imports: [TypeOrmModule.forFeature([Collect]), UtilisateursModule],
  controllers: [CollectController],
  providers: [CollectService],
  exports: [CollectService, TypeOrmModule]
})
export class CollectModule {}
