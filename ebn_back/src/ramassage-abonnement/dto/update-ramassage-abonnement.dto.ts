import { PartialType } from '@nestjs/swagger';
import { CreateRamassageAbonnementDto } from './create-ramassage-abonnement.dto';

export class UpdateRamassageAbonnementDto extends PartialType(CreateRamassageAbonnementDto) {}
