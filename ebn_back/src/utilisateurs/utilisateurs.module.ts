import { Module } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { UtilisateursController } from './utilisateurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { AuthModule } from '../collecteur/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur]), AuthModule],
  controllers: [UtilisateursController],
  providers: [UtilisateursService],
  exports: [UtilisateursService, TypeOrmModule],
})
export class UtilisateursModule {}
