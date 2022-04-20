import {RamassagePonctuel} from 'src/ramassag-ponctuel/entities/ramassagePonctuel.entity';
import {TypeDechet} from 'src/type-dechets/entities/type-dechet.entity';
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

import {Conteneur} from '../../conteneur/entities/conteneur.entity';
import {Historique} from '../../historique/entities/historique.entity';
import {Utilisateur} from "../../utilisateurs/entities/utilisateur.entity";
import {Tournee} from "../../tournee/entities/tournee.entity";
import {RamassageAbonnement} from "../../ramassage-abonnement/entities/ramassage-abonnement.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: true})
    public siret: number;

    @Column({nullable: true})
    public nomCommercial: string;

    @Column({nullable: false})
    public adresse: string;

    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.client, {onDelete: 'CASCADE'})
    @JoinTable()
    utilisateur: Utilisateur;

    @OneToMany(() => RamassagePonctuel, (ramassagePonctuel) => ramassagePonctuel.client, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinTable()
    ramassagePonctuel: RamassagePonctuel[];

    @OneToMany(() => RamassageAbonnement, (ramassageAbonnement) => ramassageAbonnement.client, {
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinTable()
    ramassageAbonnement: RamassageAbonnement[];

    @OneToMany(() => Conteneur, (conteneur) => conteneur.client, {})
    @JoinTable()
    conteneur: Conteneur[];

    @OneToMany(() => Historique, (historique) => historique.client, {onDelete: 'CASCADE'})
    @JoinTable()
    historique: Historique[];

    //TODO Tester la creation
    @ManyToMany(() => TypeDechet, (typeDechet) => typeDechet.id, {eager: true})
    @JoinTable()
    typeDechet: TypeDechet[];

    @ManyToOne(() => Tournee, (tournee) => tournee.client, {onDelete: 'CASCADE'})
    @JoinTable()
    tournee: Tournee;
}
