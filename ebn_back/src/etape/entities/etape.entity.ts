import {Column, Entity, ManyToOne} from "typeorm";
import {Collecteur} from "../../collecteur/entities/collecteur.entity";
import {Client} from "../../client/entities/client.entity";

@Entity()
export class Etape {
    @ManyToOne(() => Client, client => client.etape, {primary: true, eager: true})
    client: Client;

    @ManyToOne(() => Collecteur, collecteur => collecteur.etape, {primary: true, eager: true})
    collecteur: Collecteur;

    @Column()
    public date: Date;

    @Column({default: false})
    public isCollected: boolean;

    @Column()
    public commentaire: string;
}
