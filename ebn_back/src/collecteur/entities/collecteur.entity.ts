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

  @Column({ nullable: false })
  public nom: string;

  @Column({ nullable: false })
  public prenom: string;

  @Column({ nullable: false })
  public mail: string;

  @Column({ nullable: false })
  public telephone: string;

  @Column({ nullable: false })
  public numeroCollecteur: number;

  @Column({ nullable: false })
  public numerovelo: number;

  @OneToOne(() => Tournee, (tournee) => tournee.id, {})
  @JoinTable()
  tournee: Tournee;
}
