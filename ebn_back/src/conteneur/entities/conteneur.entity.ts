import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Conteneur {

    @PrimaryGeneratedColumn()
    public id?:number;

    @Column()
    public poid:number;

    @Column()
    public typeDeDechet:string;

    @Column()
    public idClient:number;

    @Column()
    public idTournee:number;

}
