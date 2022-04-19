import {ApiProperty} from "@nestjs/swagger";

export class CreateUtilisateurDto {
    @ApiProperty()
    public id?: number;

    @ApiProperty()
    public utilisateur: string;

    @ApiProperty()
    public password: string;

    @ApiProperty()
    public nom: string;

    @ApiProperty()
    public prenom: string;

    @ApiProperty()
    public mail: string;

    @ApiProperty()
    public telephone: string;
}
