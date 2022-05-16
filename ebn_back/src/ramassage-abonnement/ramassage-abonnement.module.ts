import { Module } from '@nestjs/common';
import { RamassageAbonnementService } from './ramassage-abonnement.service';
import { RamassageAbonnementController } from './ramassage-abonnement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RamassageAbonnement } from './entities/ramassage-abonnement.entity';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RamassageAbonnement]),
    UtilisateursModule,
  ],
  controllers: [RamassageAbonnementController],
  providers: [RamassageAbonnementService],
  exports: [RamassageAbonnementService, TypeOrmModule],
})
export class RamassageAbonnementModule {}
