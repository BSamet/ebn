import { ApiProperty } from '@nestjs/swagger';

export class CreateCollecteurDto {
  @ApiProperty()
  public numeroVelo: number;

  @ApiProperty()
  public utilisateurId: number;
}
