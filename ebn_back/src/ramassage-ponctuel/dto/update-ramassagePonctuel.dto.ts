import { PartialType } from '@nestjs/mapped-types';
import { CreateRamassagePonctuelDto } from './create-ramassagePonctuel.dto';

export class UpdateRamassagePonctuelDto extends PartialType(
  CreateRamassagePonctuelDto,
) {}
