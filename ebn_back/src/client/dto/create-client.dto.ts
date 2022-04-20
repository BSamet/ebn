import {ApiProperty} from '@nestjs/swagger';

export class CreateClientDto {
    @ApiProperty()
    public siret: number;

    @ApiProperty()
    public nomCommercial: string;

    @ApiProperty()
    public adresse: string;

    @ApiProperty()
    public utilisateurId: number;

    @ApiProperty()
    public typeDechetsId: number;
}
