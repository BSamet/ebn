import {RamassagePonctuel} from 'src/ramassag-ponctuel/entities/ramassagePonctuel.entity';
import {TypeDechet} from 'src/type-dechets/entities/type-dechet.entity';
import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

import {Conteneur} from '../../conteneur/entities/conteneur.entity';
import {Historique} from '../../historique/entities/historique.entity';
import {Utilisateur} from "../../utilisateurs/entities/utilisateur.entity";

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
    ramassage: RamassagePonctuel[];

    @OneToMany(() => Conteneur, (conteneur) => conteneur.client, {})
    @JoinTable()
    conteneur: Conteneur[];

    @OneToMany(() => Historique, (historique) => historique.client, {onDelete: 'CASCADE',})
    @JoinTable()
    historique: Historique[];

    @OneToMany(() => TypeDechet, (typeDechet) => typeDechet.client, {eager: true})
    @JoinTable()
    typeDechet: TypeDechet[];
}
