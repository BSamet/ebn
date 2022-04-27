import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Collecteur} from "../../collecteur/entities/collecteur.entity";
import {Client} from "../../client/entities/client.entity";

@Entity()
export class Etape {
    @PrimaryGeneratedColumn()
    public id?: number;
    
    @ManyToOne(() => Client, client => client.etape, {eager: true})
    client: Client;

    @ManyToOne(() => Collecteur, collecteur => collecteur.etape, {eager: true})
    collecteur: Collecteur;

    @Column()
    public date: Date;

    @Column({default: false})
    public isCollected: boolean;

    @Column()
    public commentaire: string;
}
