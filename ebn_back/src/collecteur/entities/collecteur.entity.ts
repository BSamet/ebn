import {Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Tournee} from '../../tournee/entities/tournee.entity';
import {Utilisateur} from "../../utilisateurs/entities/utilisateur.entity";

@Entity()
export class Collecteur {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public numeroCollecteur: number;

    @Column({nullable: false})
    public numeroVelo: number;

    @ManyToOne(
        () => Utilisateur,
        (utilisateur) => utilisateur.id,
        {
            onDelete: 'CASCADE',
            eager: true
        })
    @JoinTable()
    utilisateur: Utilisateur;

    @OneToOne(() => Tournee, (tournee) => tournee.id, {})
    @JoinTable()
    tournee: Tournee;
}
