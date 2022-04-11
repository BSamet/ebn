import {ApiProperty} from "@nestjs/swagger";

export class CreateTourneeDto {

    @ApiProperty()
    public id:number;

    @ApiProperty()
    public idCollecteur:number;

    @ApiProperty()
    public idConteneur:number;


}
