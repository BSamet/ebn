import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    public id?:number;

    @Column()
    public nom:string;

    @Column()
    public prenom:string;

    @Column()
    public mail:string;

    @Column()
    public telephone:string;

    @Column()
    public siret:number;

    @Column()
    public nomCommercial:string;

    @Column()
    public adresse:string;

    @Column()
    public typeDeDechets:string;

}
