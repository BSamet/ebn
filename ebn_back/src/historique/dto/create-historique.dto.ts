import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoriqueDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public date: Date;

  @ApiProperty()
  public typeDeDechet: string;

  @ApiProperty()
  public idConteneur: number;

  @ApiProperty()
  public idCollecteur: number;

  @ApiProperty()
  public clientId: number;
}
