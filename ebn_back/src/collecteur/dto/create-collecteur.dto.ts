import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../utilisateurs/dto/create-utilisateur.dto';

export class CreateCollecteurDto {
  @ApiProperty()
  public numeroVelo: number;

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
