import { Module } from '@nestjs/common';
import { RamassagePonctuelService } from './ramassagePonctuel.service';
import { RamassageController } from './ramassagePonctuel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RamassagePonctuel } from './entities/ramassagePonctuel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RamassagePonctuel])],
  controllers: [RamassageController],
  providers: [RamassagePonctuelService],
  exports: [RamassagePonctuelService, TypeOrmModule],
})
export class RamassagePonctuelModule {}
