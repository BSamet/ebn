import { ApiProperty } from '@nestjs/swagger';

export class CreateTourneeDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public collecteurId: number;
}
