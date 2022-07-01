import { Module } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { HistoriqueController } from './historique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historique } from './entities/historique.entity';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';
import { TypeDechetsModule } from '../type-dechets/type-dechets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Historique]), UtilisateursModule, TypeDechetsModule],
  controllers: [HistoriqueController],
  providers: [HistoriqueService],
  exports: [HistoriqueService, TypeOrmModule],
})
export class HistoriqueModule {}
