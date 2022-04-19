import { RamassagePonctuel } from 'src/ramassagePonctuel/entities/ramassagePonctuel.entity';
import { TypeDechet } from 'src/type-dechets/entities/type-dechet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(
    () => RamassagePonctuel,
    (ramassagePonctuel) => ramassagePonctuel.id,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinTable()
  ramassage: RamassagePonctuel[];

  @OneToMany(() => Conteneur, (conteneur) => conteneur.id, {})
  @JoinTable()
  conteneur: Conteneur[];

  @OneToMany(() => Historique, (historique) => historique.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  historique: Historique[];
  @OneToMany(() => TypeDechet, (typedechet) => typedechet.id, {})
  @JoinColumn()
  typedechet: TypeDechet[];
}
