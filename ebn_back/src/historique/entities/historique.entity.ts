import {Collecteur} from 'src/collecteur/entities/collecteur.entity';
import {Conteneur} from 'src/conteneur/entities/conteneur.entity';
import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Client} from '../../client/entities/client.entity';

@Entity()
export class Historique {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public typeAction: string;

    @Column({nullable: false})
    public date: Date;

    @Column({nullable: false})
    public typeDeDechet: string;

    @Column({nullable: false})
    public commentaire: string;

    @Column({nullable: false})
    public poids: number;

    @ManyToOne(() => Client, (client) => client.historique, {eager: true})
    @JoinTable()
    client: Client;

    @ManyToOne(() => Collecteur, (collecteur) => collecteur.historique, {eager: true})
    @JoinTable()
    collecteur: Collecteur;

    @ManyToOne(() => Conteneur, (conteneur) => conteneur.historique, {eager: true})
    @JoinTable()
    conteneur: Conteneur;
}
