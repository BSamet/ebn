import { PartialType } from '@nestjs/swagger';
import { CreateTypeDechetDto } from './create-type-dechet.dto';

export class UpdateTypeDechetDto extends PartialType(CreateTypeDechetDto) {}
