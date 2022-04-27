import {ApiProperty} from '@nestjs/swagger';

export class CreateHistoriqueDto {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public typeAction: string;

    @ApiProperty()
    public date: Date;

    @ApiProperty()
    public typeDeDechet: string;

    @ApiProperty()
    public commentaire: string;

    @ApiProperty()
    public poids: number;

    @ApiProperty()
    public clientId: number;

    @ApiProperty()
    public collecteurId: number;

    @ApiProperty()
    public conteneurId: number;
}
