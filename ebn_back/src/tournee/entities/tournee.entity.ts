import {Column, Entity} from "typeorm";

@Entity()
export class Tournee {

    @Column()
    public id:number;

    @Column()
    public idCollecteur:number;

    @Column()
    public idConteneur:number;

}
