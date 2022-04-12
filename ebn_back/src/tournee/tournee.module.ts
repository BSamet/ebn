import { Module } from '@nestjs/common';
import { TourneeService } from './tournee.service';
import { TourneeController } from './tournee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournee } from './entities/tournee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournee])],
  controllers: [TourneeController],
  providers: [TourneeService],
  exports: [TourneeService, TypeOrmModule],
})
export class TourneeModule {}
