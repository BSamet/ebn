import {ApiProperty} from '@nestjs/swagger';

export class CreateClientDto {
    @ApiProperty()
    public id?: number;

    @ApiProperty()
    public siret: number;

    @ApiProperty()
    public nomCommercial: string;

    @ApiProperty()
    public adresse: string;

    @ApiProperty()
    public utilisateurId: number;
}
