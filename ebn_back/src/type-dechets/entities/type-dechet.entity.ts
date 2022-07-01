import {Conteneur} from 'src/conteneur/entities/conteneur.entity';
import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Collect} from "../../collect/entities/collect.entity";
import {Etape} from "../../etape/entities/etape.entity";

@Entity()
export class TypeDechet {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public typeDechets: string;

    @Column({nullable: false})
    public prixKg: number;

    @OneToMany(() => Conteneur, (conteneur) => conteneur.typeDechet, {})
    @JoinTable()
    conteneur: Conteneur[];

    @OneToMany(
        () => Collect,
        (collect) => collect.typeDechet,
        {},
    )
    @JoinTable()
    collect: Collect[];

    @OneToMany(
        () => Etape,
        (etape) => etape.typeDechet,
        {},
    )
    @JoinTable()
    etape: Etape[];
}
