import { Module } from '@nestjs/common';
import { CollecteurService } from './collecteur.service';
import { CollecteurController } from './collecteur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collecteur } from './entities/collecteur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collecteur])],
  controllers: [CollecteurController],
  providers: [CollecteurService],
  exports: [CollecteurService, TypeOrmModule],
})
export class CollecteurModule {}
