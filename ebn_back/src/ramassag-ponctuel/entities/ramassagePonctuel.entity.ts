import { Type } from 'class-transformer';
import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Client} from '../../client/entities/client.entity';

@Entity()
export class RamassagePonctuel {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Type(() => Date)
    @Column({nullable: false})
    public date: Date;

    @ManyToOne(() => Client, (client) => client.ramassagePonctuel)
    @JoinTable()
    client: Client;
}
