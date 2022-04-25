import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {getConnectionOptions} from 'typeorm';
import {ClientModule} from './client/client.module';
import {CollecteurModule} from './collecteur/collecteur.module';
import {RamassagePonctuelModule} from './ramassag-ponctuel/ramassagePonctuel.module';
import {HistoriqueModule} from './historique/historique.module';
import {ConteneurModule} from './conteneur/conteneur.module';
import {TypeDechetsModule} from './type-dechets/type-dechets.module';
import {UtilisateursModule} from './utilisateurs/utilisateurs.module';
import {RamassageAbonnementModule} from './ramassage-abonnement/ramassage-abonnement.module';
import {EtapeModule} from './etape/etape.module';

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
        RamassagePonctuelModule,
        HistoriqueModule,
        ConteneurModule,
        TypeDechetsModule,
        UtilisateursModule,
        RamassageAbonnementModule,
        EtapeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
