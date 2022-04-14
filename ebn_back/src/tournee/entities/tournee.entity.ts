import {
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Collecteur } from '../../collecteur/entities/collecteur.entity';
import { Conteneur } from '../../conteneur/entities/conteneur.entity';

@Entity()
export class Tournee {
  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToOne(() => Collecteur, {
    eager: true,
  })
  @JoinColumn()
  collecteur: Collecteur;

  @OneToMany(() => Conteneur, (conteneur) => conteneur.id, {})
  @JoinTable()
  conteneur: Conteneur;
}
