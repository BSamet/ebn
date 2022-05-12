import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'Admin',
  COLLECTEUR = 'Collecteur',
  CLIENT = 'Client',
}

export class CreateUtilisateurDto {
  @ApiProperty()
  public role: UserRole;

  @ApiProperty()
  public utilisateur: string;

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
