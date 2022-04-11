import { Module } from '@nestjs/common';
import { RamassageService } from './ramassage.service';
import { RamassageController } from './ramassage.controller';

@Module({
  controllers: [RamassageController],
  providers: [RamassageService]
})
export class RamassageModule {}
