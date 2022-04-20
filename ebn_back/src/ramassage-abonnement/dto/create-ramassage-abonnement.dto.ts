import {ApiProperty} from "@nestjs/swagger";

export class CreateRamassageAbonnementDto {
    @ApiProperty()
    public dateReference: Date;

    @ApiProperty()
    public periodicite: number;

    @ApiProperty()
    clientid: number;
}
