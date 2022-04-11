import { PartialType } from '@nestjs/mapped-types';
import { CreateRamassageDto } from './create-ramassage.dto';

export class UpdateRamassageDto extends PartialType(CreateRamassageDto) {}
