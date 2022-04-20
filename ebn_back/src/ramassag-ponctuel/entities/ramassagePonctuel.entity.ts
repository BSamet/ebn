import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Client} from '../../client/entities/client.entity';

@Entity()
export class RamassagePonctuel {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public date: Date;

    @ManyToOne(() => Client, (client) => client.ramassage, {onDelete: 'CASCADE'})
    @JoinTable()
    client: Client;
}
