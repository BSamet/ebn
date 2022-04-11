import {Column, Entity} from "typeorm";

@Entity()
export class Conteneur {

    @Column()
    public id:number;

    @Column()
    public poid:number;

    @Column()
    public typeDeDechet:string;

    @Column()
    public idClient:number;

    @Column()
    public idTournee:number;

}
