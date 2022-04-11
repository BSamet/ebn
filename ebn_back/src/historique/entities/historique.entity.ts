import {Column, Entity} from "typeorm";

@Entity()
export class Historique {

    @Column()
    public id:number;

    @Column()
    public idClient:number;

    @Column()
    public date:Date;

    @Column()
    public typeDeDechet:string;

    @Column()
    public idConteneur:number;

    @Column()
    public idCollecteur:number;







}
