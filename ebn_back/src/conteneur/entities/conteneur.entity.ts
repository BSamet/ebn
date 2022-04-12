import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Tournee } from '../../tournee/entities/tournee.entity';

@Entity()
export class Conteneur {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public poid: number;

  @Column()
  public typeDeDechet: string;

  @ManyToOne(() => Client, (client) => client.id, {})
  @JoinTable()
  client: Client;

  @ManyToOne(() => Tournee, (tournee) => tournee.id, {})
  @JoinTable()
  tournee: Tournee;
}
