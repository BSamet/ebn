import { Module } from '@nestjs/common';
import { ConteneurService } from './conteneur.service';
import { ConteneurController } from './conteneur.controller';

@Module({
  controllers: [ConteneurController],
  providers: [ConteneurService]
})
export class ConteneurModule {}
