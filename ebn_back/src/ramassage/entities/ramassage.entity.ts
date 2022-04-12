import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';

@Entity()
export class Ramassage {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public date: Date;

  @ManyToOne(() => Client, (client) => client.id, {})
  @JoinTable()
  client: Client;
}
