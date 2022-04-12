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

  @ManyToOne(() => Client, (client) => client.id, {
    eager: true,
  })
  @JoinTable()
  client: Client;

  @ManyToOne(() => Tournee, (tournee) => tournee.id, {
    eager: true,
  })
  @JoinTable()
  tournee: Tournee;
}
