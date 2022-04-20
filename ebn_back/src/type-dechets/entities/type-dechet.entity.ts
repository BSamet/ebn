import {Conteneur} from 'src/conteneur/entities/conteneur.entity';
import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';

@Entity()
export class TypeDechet {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({nullable: false})
    public typeDechets: string;

    @ManyToOne(() => Conteneur, (conteneur) => conteneur.typeDechet, {})
    @JoinTable()
    conteneur: Conteneur[];
}
