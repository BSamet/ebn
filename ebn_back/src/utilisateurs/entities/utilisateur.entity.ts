import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}
