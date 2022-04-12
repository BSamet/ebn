import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ramassage } from '../../ramassage/entities/ramassage.entity';
import { Conteneur } from '../../conteneur/entities/conteneur.entity';
import { Historique } from '../../historique/entities/historique.entity';

@Entity()
export class Client {
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
  public siret: number;

  @Column()
  public nomCommercial: string;

  @Column()
  public adresse: string;

  @Column()
  public typeDeDechets: string;

  @OneToMany(() => Ramassage, (ramassage) => ramassage.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  ramassage: Ramassage[];

  @OneToMany(() => Conteneur, (conteneur) => conteneur.id, {
    eager: true,
  })
  @JoinTable()
  conteneur: Conteneur[];

  @OneToMany(() => Historique, (historique) => historique.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  historique: Historique[];
}
