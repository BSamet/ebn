import {ApiProperty} from "@nestjs/swagger";

export class CreateCollectDto {
    @ApiProperty()
    public refDate: Date;

    @ApiProperty()
    public days: number[];

    @ApiProperty()
    public isSubscribe: boolean;

    @ApiProperty()
    public clientId: number;
}
