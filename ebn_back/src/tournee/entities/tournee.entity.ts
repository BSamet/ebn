import {Client} from 'src/client/entities/client.entity';
import {Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {Collecteur} from '../../collecteur/entities/collecteur.entity';

@Entity()
export class Tournee {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public date: Date;

    @OneToOne(() => Collecteur, {
        eager: true,
    })
    @JoinColumn()
    collecteur: Collecteur;

    @OneToMany(() => Client, (client) => client.id, {})
    @JoinTable()
    client: Client[];
}
