import {ApiProperty} from "@nestjs/swagger";

export class CreateEtapeDto {
    @ApiProperty()
    public clientId: number;

    @ApiProperty()
    public collecteurId: number;

    @ApiProperty()
    public isCollected: boolean;

    @ApiProperty()
    public commentaire: string;
}
