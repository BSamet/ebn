import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ClientModule } from './client/client.module';
import { CollecteurModule } from './collecteur/collecteur.module';
import { AdminModule } from './admin/admin.module';
import { RamassagePonctuelModule } from './ramassagePonctuel/ramassagePonctuel.module';
import { HistoriqueModule } from './historique/historique.module';
import { TourneeModule } from './tournee/tournee.module';
import { ConteneurModule } from './conteneur/conteneur.module';
import { TypeDechetsModule } from './type-dechets/type-dechets.module';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    ClientModule,
    CollecteurModule,
    AdminModule,
    RamassagePonctuelModule,
    HistoriqueModule,
    TourneeModule,
    ConteneurModule,
    TypeDechetsModule,
    UtilisateursModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
