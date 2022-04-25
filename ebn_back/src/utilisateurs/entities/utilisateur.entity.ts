import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "../../client/entities/client.entity";
import {Collecteur} from "../../collecteur/entities/collecteur.entity";

@Entity()
export class Utilisateur {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public role: string;

    @Column()
    public utilisateur: string;

    @Column()
    public password: string;

    @Column()
    public nom: string;

    @Column()
    public prenom: string;

    @Column()
    public mail: string;

    @Column()
    public telephone: string;

    @OneToMany(() => Client, (client) => client.utilisateur, {onDelete: "CASCADE"})
    @JoinTable()
    client: Client[];

    @OneToMany(() => Collecteur, (collecteur) => collecteur.utilisateur, {onDelete: "CASCADE"})
    @JoinTable()
    collecteur: Collecteur[];
}
