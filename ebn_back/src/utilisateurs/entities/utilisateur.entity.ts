import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "../../client/entities/client.entity";
import {Admin} from "../../admin/entities/admin.entity";
import {Collecteur} from "../../collecteur/entities/collecteur.entity";

@Entity()
export class Utilisateur {
    @PrimaryGeneratedColumn()
    public id?: number;

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

    @OneToMany(() => Client, (client) => client.utilisateur, {eager: true})
    @JoinTable()
    client: Client[];

    @OneToMany(() => Admin, (admin) => admin.utilisateur, {eager: true})
    @JoinTable()
    admin: Admin[];

    @OneToMany(() => Collecteur, (collecteur) => collecteur.utilisateur, {eager: true})
    @JoinTable()
    collecteur: Collecteur[];
}
