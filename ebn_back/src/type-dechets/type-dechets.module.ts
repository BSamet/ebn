import { Module } from '@nestjs/common';
import { TypeDechetsService } from './type-dechets.service';
import { TypeDechetsController } from './type-dechets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeDechet } from './entities/type-dechet.entity';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [TypeOrmModule.forFeature([TypeDechet]), UtilisateursModule],
  controllers: [TypeDechetsController],
  providers: [TypeDechetsService],
  exports: [TypeDechetsService, TypeOrmModule],
})
export class TypeDechetsModule {}
