import {RamassagePonctuel} from 'src/ramassagePonctuel/entities/ramassagePonctuel.entity';
import {TypeDechet} from 'src/type-dechets/entities/type-dechet.entity';
import {Column, Entity, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';

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

    @OneToOne(
        () => Utilisateur,
        (utilisateur) => utilisateur.id,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinTable()
    utilisateur: Utilisateur;

    @OneToMany(
        () => RamassagePonctuel,
        (ramassagePonctuel) => ramassagePonctuel.id,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinTable()
    ramassage: RamassagePonctuel[];

    @OneToMany(() => Conteneur, (conteneur) => conteneur.id, {})
    @JoinTable()
    conteneur: Conteneur[];

    @OneToMany(
        () => Historique,
        (historique) => historique.id,
        {
            onDelete: 'CASCADE',
        })
    @JoinTable()
    historique: Historique[];

    @OneToMany(() => TypeDechet, (typeDechet) => typeDechet.id,)
    @JoinTable()
    typeDechet: TypeDechet[];
}
