import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../utilisateurs/dto/create-utilisateur.dto';

export class CreateClientDto {
  @ApiProperty()
  public siret: number;

  @ApiProperty()
  public nomCommercial: string;

  @ApiProperty()
  public adresse: string;

  @ApiProperty()
  public typeDechetsId: number;

  @ApiProperty()
  public role: UserRole;

  @ApiProperty()
  public password: string;

  @ApiProperty()
  public nom: string;

  @ApiProperty()
  public prenom: string;

  @ApiProperty()
  public mail: string;

  @ApiProperty()
  public telephone: string;
}
