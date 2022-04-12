import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  public id?: number;

  @ApiProperty()
  public nom: string;

  @ApiProperty()
  public prenom: string;

  @ApiProperty()
  public mail: string;

  @ApiProperty()
  public telephone: number;

  @ApiProperty()
  public siret: number;

  @ApiProperty()
  public nomCommercial: string;

  @ApiProperty()
  public adresse: string;

  @ApiProperty()
  public typeDeDechets: string;
}
