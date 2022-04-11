import {ApiProperty} from "@nestjs/swagger";

export class CreateRamassageDto {

    @ApiProperty()
    public date:Date;

}
