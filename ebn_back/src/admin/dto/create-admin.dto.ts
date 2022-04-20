import {ApiProperty} from "@nestjs/swagger";

export class CreateAdminDto {

    @ApiProperty()
    public id?: number;

    @ApiProperty()
    public utilisateurId: number;
}
