import {Collecteur} from 'src/collecteur/entities/collecteur.entity';
import {Conteneur} from 'src/conteneur/entities/conteneur.entity';
import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Client} from '../../client/entities/client.entity';

@Entity()
export class Historique {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public date: Date;

    @Column({nullable: false})
    public typeDeDechet: string;

    @Column({nullable: false})
    public idConteneur: number;

    @Column({nullable: false})
    public idCollecteur: number;

    @ManyToOne(() => Client, (client) => client.historique, {})
    @JoinTable()
    client: Client;

    @OneToMany(() => Collecteur, (collecteur) => collecteur.id, {})
    @JoinTable()
    collecteur: Collecteur[];

    @OneToMany(() => Conteneur, (conteneur) => conteneur.id, {})
    @JoinTable()
    conteneur: Conteneur[];
}
