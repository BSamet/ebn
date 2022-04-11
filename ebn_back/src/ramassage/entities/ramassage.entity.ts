import {Column, Entity} from "typeorm";

@Entity()
export class Ramassage {

    @Column()
    public date:Date;
}
