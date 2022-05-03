import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Client} from '../../client/entities/client.entity';
import {TypeDechet} from "../../type-dechets/entities/type-dechet.entity";
import {Historique} from "../../historique/entities/historique.entity";

@Entity()
export class Conteneur {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public capaciteMax: number;

    @Column()
    public isAvailable: boolean;

    @ManyToOne(() => TypeDechet, (typeDechet) => typeDechet.conteneur, {onUpdate: 'CASCADE'})
    @JoinTable()
    typeDechet: TypeDechet;

    @ManyToOne(() => Client, (client) => client.conteneur, {onUpdate: 'CASCADE', nullable: true})
    @JoinTable()
    client: Client;

    @OneToMany(() => Historique, (historique) => historique.conteneur, {})
    @JoinTable()
    historique: Historique[];
}
