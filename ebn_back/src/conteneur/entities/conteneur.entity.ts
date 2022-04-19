import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Client} from '../../client/entities/client.entity';
import {Tournee} from '../../tournee/entities/tournee.entity';
import {TypeDechet} from "../../type-dechets/entities/type-dechet.entity";

@Entity()
export class Conteneur {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public poid: number;

    @OneToMany(() => TypeDechet, (typeDechet) => typeDechet.id, {})
    @JoinTable()
    typeDechet: TypeDechet;

    @ManyToOne(() => Client, (client) => client.id, {})
    @JoinTable()
    client: Client;

    @ManyToOne(() => Tournee, (tournee) => tournee.id, {})
    @JoinTable()
    tournee: Tournee;
}
