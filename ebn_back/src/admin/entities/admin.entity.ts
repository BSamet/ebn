import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Admin {
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


}
