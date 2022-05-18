import { Module } from '@nestjs/common';
import { ConteneurService } from './conteneur.service';
import { ConteneurController } from './conteneur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conteneur } from './entities/conteneur.entity';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conteneur]), UtilisateursModule],
  controllers: [ConteneurController],
  providers: [ConteneurService],
  exports: [ConteneurService, TypeOrmModule],
})
export class ConteneurModule {}
