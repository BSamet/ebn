import {ApiProperty} from "@nestjs/swagger";

export class CreateCollecteurDto {

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

    @ApiProperty()
    public numeroCollecteur:number;

    @ApiProperty()
    public numerovelo:number;


}
