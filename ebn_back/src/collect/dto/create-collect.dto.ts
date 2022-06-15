import {ApiProperty} from "@nestjs/swagger";

export class CreateCollectDto {
    @ApiProperty()
    public refDate: Date;

    @ApiProperty()
    public days: string[];

    @ApiProperty()
    public isSubscribe: boolean;

    @ApiProperty()
    public clientId: number;
}
