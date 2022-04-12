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

  @Column({ nullable: false })
  public nom: string;

  @Column({ nullable: false })
  public prenom: string;

  @Column({ nullable: false })
  public mail: string;

  @Column({ nullable: false })
  public telephone: number;

  @Column({ nullable: true })
  public siret: number;

  @Column({ nullable: true })
  public nomCommercial: string;

  @Column({ nullable: false })
  public adresse: string;

  @Column({ nullable: false })
  public typeDeDechets: string;

  @OneToMany(() => Ramassage, (ramassage) => ramassage.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  ramassage: Ramassage[];

  @OneToMany(() => Conteneur, (conteneur) => conteneur.id, {})
  @JoinTable()
  conteneur: Conteneur[];

  @OneToMany(() => Historique, (historique) => historique.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  historique: Historique[];
}
