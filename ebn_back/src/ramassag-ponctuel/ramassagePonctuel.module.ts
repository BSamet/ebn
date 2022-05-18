import { Module } from '@nestjs/common';
import { RamassagePonctuelService } from './ramassagePonctuel.service';
import { RamassageController } from './ramassagePonctuel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RamassagePonctuel } from './entities/ramassagePonctuel.entity';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [TypeOrmModule.forFeature([RamassagePonctuel]), UtilisateursModule],
  controllers: [RamassageController],
  providers: [RamassagePonctuelService],
  exports: [RamassagePonctuelService, TypeOrmModule],
})
export class RamassagePonctuelModule {}
