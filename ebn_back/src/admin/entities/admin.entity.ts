import {Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Utilisateur} from "../../utilisateurs/entities/utilisateur.entity";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(
        () => Utilisateur,
        (utilisateur) => utilisateur.id,
        {
            onDelete: 'CASCADE',
            eager: true
        })
    @JoinTable()
    utilisateur: Utilisateur;
}
