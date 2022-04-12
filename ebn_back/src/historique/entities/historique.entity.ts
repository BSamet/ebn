import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';

@Entity()
export class Historique {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public date: Date;

  @Column()
  public typeDeDechet: string;

  @Column()
  public idConteneur: number;

  @Column()
  public idCollecteur: number;

  @ManyToOne(() => Client, (client) => client.id, {
    eager: true,
  })
  @JoinTable()
  client: Client;
}
