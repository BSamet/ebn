import {ApiProperty} from "@nestjs/swagger";

export class CreateCollecteurDto {
    @ApiProperty()
    public numeroCollecteur: number;

    @ApiProperty()
    public numeroVelo: number;

    @ApiProperty()
    public utilisateurId: number;
}
