import { Module } from '@nestjs/common';
import { CollecteurService } from './collecteur.service';
import { CollecteurController } from './collecteur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collecteur } from './entities/collecteur.entity';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collecteur]), UtilisateursModule],
  controllers: [CollecteurController],
  providers: [CollecteurService],
  exports: [CollecteurService, TypeOrmModule],
})
export class CollecteurModule {}
