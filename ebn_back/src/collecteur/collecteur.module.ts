import { Module } from '@nestjs/common';
import { CollecteurService } from './collecteur.service';
import { CollecteurController } from './collecteur.controller';

@Module({
  controllers: [CollecteurController],
  providers: [CollecteurService]
})
export class CollecteurModule {}
