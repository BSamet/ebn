import { Module } from '@nestjs/common';
import { EtapeService } from './etape.service';
import { EtapeController } from './etape.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etape } from './entities/etape.entity';
import { HistoriqueModule } from 'src/historique/historique.module';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Etape]),
    HistoriqueModule,
    UtilisateursModule,
  ],
  controllers: [EtapeController],
  providers: [EtapeService],
  exports: [EtapeService, TypeOrmModule],
})
export class EtapeModule {}
