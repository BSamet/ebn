INSERT INTO admin(nom, prenom, mail, telephone)
VALUES ('Bulut', 'Samet', 'samet@gmail.com', '0645859665'),
       ('John', 'Doe', 'johnDoe@gmail.com', '0565859565'),
       ('Daniel', 'David', 'dd@hotmailfr', '0654859664'),
       ('Mohammed', 'Karim', 'momo@gmail.com', '0785659852');


INSERT INTO client(nom, prenom, mail, telephone, siret, nomCommercial, adresse, typeDeDechets)
VALUES ('Chaine', 'Bryan', 'bracha@gmail.com', '0685654785', '56585674554785', 'La Mere Rouge', '22 rue du moulin',
        'bio-dechets'),
       ('Hartout', 'Ilies', 'petithibou@gmail.com', '0785658965', '56585447554785', 'Tour de l''Europe',
        '45 rue de la schlucht', 'Marc de café');

INSERT INTO collecteur(nom, prenom, mail, telephone, numeroCollecteur, numerovelo)
VALUES ('Vucelj', 'Anes', 'anes@gmail.com', '0788956545', '27', '1'),
       ('Sebo', 'Amil', 'Amiloup@hotmail.fr', '0666666688', '69', '2'),
       ('Truche', 'Gael', 'gaeltruche@gmail.com', '0785659854', '57', '3');

INSERT INTO tournee(collecteurId)
VALUES ('1'),
       ('2');

INSERT INTO conteneur(poid, typeDeDechet, clientId, tourneeId)
VALUES ('10', 'bio-dechets', '3', '1'),
       ('7', 'Marc de café', '4', '2');

INSERT INTO historique(date, typeDeDechet, idConteneur, idCollecteur, clientId)
VALUES ('2022-04-12T13:00:09.024Z', 'bio-dechet', '1', '1', '3'),
       ('2022-04-12T13:12:09.024Z', 'Marc de café', '2', '2', '4');

INSERT INTO ramassage(date, clientId)
VALUES ('2022-01-12T14:20:09.024Z', '3'),
       ('2022-01-13T15:22:09.024Z', '4');

