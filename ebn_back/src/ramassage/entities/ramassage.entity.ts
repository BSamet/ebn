import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Ramassage {

    @PrimaryGeneratedColumn()
    public id?:number;

    @Column()
    public date:Date;
}
