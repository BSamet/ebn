import {ApiProperty} from "@nestjs/swagger";

export class CreateConteneurDto {

    @ApiProperty()
    public id:number;

    @ApiProperty()
    public poid:number;

    @ApiProperty()
    public typeDeDechet:string;

    @ApiProperty()
    public idClient:number;

    @ApiProperty()
    public idTournee:number;

}
