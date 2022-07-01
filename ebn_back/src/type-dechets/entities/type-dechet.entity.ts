import {Conteneur} from 'src/conteneur/entities/conteneur.entity';
import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';

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
}
