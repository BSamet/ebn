import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "../../client/entities/client.entity";

@Entity()
export class RamassageAbonnement {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public dateReference: Date;

    @Column()
    public periodicite: number;

    @ManyToOne(() => Client, (client) => client.ramassageAbonnement)
    @JoinTable()
    client: Client;
}
