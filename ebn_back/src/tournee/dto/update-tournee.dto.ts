import { PartialType } from '@nestjs/mapped-types';
import { CreateTourneeDto } from './create-tournee.dto';

export class UpdateTourneeDto extends PartialType(CreateTourneeDto) {}
