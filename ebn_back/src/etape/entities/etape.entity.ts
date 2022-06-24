import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Collecteur} from '../../collecteur/entities/collecteur.entity';
import {Client} from '../../client/entities/client.entity';
import {TypeDechet} from "../../type-dechets/entities/type-dechet.entity";

@Entity()
export class Etape {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => Client, (client) => client.etape, {eager: true})
    client: Client;

    @ManyToOne(() => Collecteur, (collecteur) => collecteur.etape, {
        eager: true,
    })
    collecteur: Collecteur;

    @Column({default: null})
    public date: Date;

    @Column({default: false})
    public isCollected: boolean;

    @Column({default: false})
    public isAssigned: boolean;

    @Column({nullable: true})
    public commentaire: string;

    @ManyToOne(() => TypeDechet, (typeDechet) => typeDechet.etape)
    @JoinTable()
    typeDechet: TypeDechet;
}
