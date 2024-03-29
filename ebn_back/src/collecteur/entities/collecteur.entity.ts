import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Utilisateur } from '../../utilisateurs/entities/utilisateur.entity';
import { Historique } from '../../historique/entities/historique.entity';
import { Etape } from '../../etape/entities/etape.entity';

@Entity()
export class Collecteur {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: true })
  public numeroVelo: number;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.collecteur, {
    eager: true,
  })
  @JoinTable()
  utilisateur: Utilisateur;

  @OneToOne(() => Historique, (historique) => historique.collecteur, {})
  @JoinTable()
  historique: Historique[];

  @OneToMany(() => Etape, (etape) => etape.collecteur)
  @JoinTable()
  etape: Etape[];
}
