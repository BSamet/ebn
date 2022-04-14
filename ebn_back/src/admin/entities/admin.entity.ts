import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false })
  public nom: string;

  @Column({ nullable: false })
  public prenom: string;

  @Column({ nullable: false })
  public mail: string;

  @Column({ nullable: false })
  public telephone: string;
}
