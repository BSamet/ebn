import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Tournee {

    @PrimaryGeneratedColumn()
    public id?:number;

    @Column()
    public idCollecteur:number;

    @Column()
    public idConteneur:number;

}
