import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tournee } from '../../tournee/entities/tournee.entity';

@Entity()
export class Collecteur {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public nom: string;

  @Column()
  public prenom: string;

  @Column()
  public mail: string;

  @Column()
  public telephone: string;

  @Column()
  public numeroCollecteur: number;

  @Column()
  public numerovelo: number;

  @OneToOne(() => Tournee, (tournee) => tournee.id, {
    eager: true,
  })
  @JoinTable()
  tournee: Tournee;
}
