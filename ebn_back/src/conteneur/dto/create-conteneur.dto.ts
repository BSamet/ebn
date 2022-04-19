import {ApiProperty} from '@nestjs/swagger';

export class CreateConteneurDto {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public poid: number;

    @ApiProperty()
    public typeDechetId: number;

    @ApiProperty()
    public clientId: number;

    @ApiProperty()
    public tourneeId: number;
}
