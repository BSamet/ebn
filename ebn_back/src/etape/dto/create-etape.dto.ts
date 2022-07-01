import {ApiProperty} from "@nestjs/swagger";

export class CreateEtapeDto {
    @ApiProperty()
    public clientId: number;

    @ApiProperty()
    public collecteurId: number;

    @ApiProperty()
    public typeDechetId: number;

    @ApiProperty()
    public isCollected: boolean;

    @ApiProperty()
    public isAssigned: boolean;

    @ApiProperty()
    public commentaire: string;

    @ApiProperty()
    public date: Date;
}
