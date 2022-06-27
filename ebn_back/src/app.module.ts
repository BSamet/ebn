import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ClientModule} from './client/client.module';
import {CollecteurModule} from './collecteur/collecteur.module';
import {HistoriqueModule} from './historique/historique.module';
import {ConteneurModule} from './conteneur/conteneur.module';
import {TypeDechetsModule} from './type-dechets/type-dechets.module';
import {UtilisateursModule} from './utilisateurs/utilisateurs.module';
import {EtapeModule} from './etape/etape.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {CollectModule} from './collect/collect.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number.parseInt(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
            ssl: false,
        }),
        ConfigModule.forRoot({isGlobal: true}),
        ClientModule,
        CollecteurModule,
        HistoriqueModule,
        ConteneurModule,
        TypeDechetsModule,
        UtilisateursModule,
        EtapeModule,
        AuthModule,
        CollectModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
