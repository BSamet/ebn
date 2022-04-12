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

  @Column({ nullable: false })
  public date: Date;

  @Column({ nullable: false })
  public typeDeDechet: string;

  @Column({ nullable: false })
  public idConteneur: number;

  @Column({ nullable: false })
  public idCollecteur: number;

  @ManyToOne(() => Client, (client) => client.id, {})
  @JoinTable()
  client: Client;
}
