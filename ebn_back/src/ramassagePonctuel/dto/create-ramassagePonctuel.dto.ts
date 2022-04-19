import { ApiProperty } from '@nestjs/swagger';

export class CreateRamassagePonctuelDto {
  @ApiProperty()
  public date: Date;

  @ApiProperty()
  public clientId: number;
}
