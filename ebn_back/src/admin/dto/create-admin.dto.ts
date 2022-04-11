import {ApiProperty} from "@nestjs/swagger";

export class CreateAdminDto {

    @ApiProperty()
    public id?:number;

    @ApiProperty()
    public nom:string;

    @ApiProperty()
    public prenom:string;

    @ApiProperty()
    public mail:string;

    @ApiProperty()
    public telephone:string;
}
