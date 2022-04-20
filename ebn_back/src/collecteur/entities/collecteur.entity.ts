import {Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Tournee} from '../../tournee/entities/tournee.entity';
import {Utilisateur} from "../../utilisateurs/entities/utilisateur.entity";
import {Historique} from "../../historique/entities/historique.entity";

@Entity()
export class Collecteur {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public numeroCollecteur: number;

    @Column({nullable: false})
    public numeroVelo: number;

    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.collecteur,)
    @JoinTable()
    utilisateur: Utilisateur;

    @OneToOne(() => Historique, (historique) => historique.collecteur, {})
    @JoinTable()
    historique: Historique[];

    @OneToOne(() => Tournee, (tournee) => tournee.collecteur, {eager: true})
    @JoinTable()
    tournee: Tournee;
}
