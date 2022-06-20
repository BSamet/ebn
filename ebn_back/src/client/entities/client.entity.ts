import { TypeDechet } from 'src/type-dechets/entities/type-dechet.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conteneur } from '../../conteneur/entities/conteneur.entity';
import { Historique } from '../../historique/entities/historique.entity';
import { Utilisateur } from '../../utilisateurs/entities/utilisateur.entity';
import { RamassageAbonnement } from '../../ramassage-abonnement/entities/ramassage-abonnement.entity';
import { Etape } from '../../etape/entities/etape.entity';
import { RamassagePonctuel } from '../../ramassage-ponctuel/entities/ramassagePonctuel.entity';
import {Collect} from "../../collect/entities/collect.entity";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: true })
  public siret: number;

  @Column({ nullable: true })
  public nomCommercial: string;

  @Column({ nullable: false })
  public adresse: string;

  @Column({ nullable: false })
  public clientvalide: boolean;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.client, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  utilisateur: Utilisateur;

  @OneToMany(
    () => RamassagePonctuel,
    (ramassagePonctuel) => ramassagePonctuel.client,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  @JoinTable()
  ramassagePonctuel: RamassagePonctuel[];

  @OneToMany(
    () => RamassageAbonnement,
    (ramassageAbonnement) => ramassageAbonnement.client,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  @JoinTable()
  ramassageAbonnement: RamassageAbonnement[];

  @OneToMany(
      () => Collect,
      (collect) => collect.client,
      {
        onDelete: 'CASCADE',
        eager: true,
      },
  )
  @JoinTable()
  collect: Collect[];

  @OneToMany(() => Conteneur, (conteneur) => conteneur.client, { eager: true })
  @JoinTable()
  conteneur: Conteneur[];

  @OneToMany(() => Historique, (historique) => historique.client, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  historique: Historique[];

  @ManyToMany(() => TypeDechet, (typeDechet) => typeDechet.id, { eager: true })
  @JoinTable()
  typeDechet: TypeDechet[];

  @OneToMany(() => Etape, (etape) => etape.client)
  @JoinTable()
  etape: Etape[];
}
