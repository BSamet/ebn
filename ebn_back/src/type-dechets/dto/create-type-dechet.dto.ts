import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDechetDto {
  @ApiProperty()
  public id?: number;
  @ApiProperty()
  public nom: string;
}
