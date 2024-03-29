import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { UtilisateursModule } from '../utilisateurs/utilisateurs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), UtilisateursModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService, TypeOrmModule],
})
export class ClientModule {}
