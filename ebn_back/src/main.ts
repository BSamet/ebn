import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('EBN api')
        .setDescription('api du back')
        .setVersion('1.0')
        .addTag('api')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(5454);
}

bootstrap();

//TODO Table de lisaison typedechet -> Client ManytoMany; Conteneur oneToMany Typedechets; historique lisaison typedechet et collecteur, enlever idconteneur; tourneeid sur client; enlever tabble admin et rajouter rôle dans utilisateur;