import {Client} from 'src/client/entities/client.entity';
import {Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Collecteur} from '../../collecteur/entities/collecteur.entity';

@Entity()
export class Tournee {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public date: Date;

    @OneToOne(() => Collecteur, (collecteur) => collecteur.tournee)
    @JoinColumn()
    collecteur: Collecteur;

    @OneToMany(() => Client, (client) => client.tournee, {eager: true})
    @JoinTable()
    client: Client[];
}
