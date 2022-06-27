import {Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "../../client/entities/client.entity";
import {TypeDechet} from "../../type-dechets/entities/type-dechet.entity";

@Entity()
export class Collect {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public refDate: Date;

    @Column({nullable: true})
    public cronExpression: string;

    @ManyToOne(() => Client, (client) => client.collect)
    @JoinTable()
    client: Client;

    @ManyToOne(() => TypeDechet, (typeDechet) => typeDechet.collect, {eager: true})
    @JoinTable()
    typeDechet: TypeDechet;
}
