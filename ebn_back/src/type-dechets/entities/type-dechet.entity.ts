import { Client } from 'src/client/entities/client.entity';
import { Conteneur } from 'src/conteneur/entities/conteneur.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TypeDechet {
  @PrimaryGeneratedColumn()
  public id?: number;
  @Column({ nullable: false })
  public typeDechets: string;

  @ManyToOne(() => Conteneur, (conteneur) => conteneur.id, {})
  @JoinTable()
  conteneur: Conteneur[];

  @ManyToOne(() => Client, (client) => client.id, {})
  @JoinTable()
  client: Client[];
}
