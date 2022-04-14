import { Module } from '@nestjs/common';
import { RamassageService } from './ramassage.service';
import { RamassageController } from './ramassage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ramassage } from './entities/ramassage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ramassage])],
  controllers: [RamassageController],
  providers: [RamassageService],
  exports: [RamassageService, TypeOrmModule],
})
export class RamassageModule {}
