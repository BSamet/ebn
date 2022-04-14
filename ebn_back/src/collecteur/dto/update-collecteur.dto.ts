import { PartialType } from '@nestjs/mapped-types';
import { CreateCollecteurDto } from './create-collecteur.dto';

export class UpdateCollecteurDto extends PartialType(CreateCollecteurDto) {}
