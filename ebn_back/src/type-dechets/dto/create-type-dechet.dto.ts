import {ApiProperty} from '@nestjs/swagger';

export class CreateTypeDechetDto {
    @ApiProperty()
    public typeDechets: string;
}
