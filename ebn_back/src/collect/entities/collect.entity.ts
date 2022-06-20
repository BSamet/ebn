import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "../../client/entities/client.entity";

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
}
