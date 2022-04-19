import { Module } from '@nestjs/common';
import { TypeDechetsService } from './type-dechets.service';
import { TypeDechetsController } from './type-dechets.controller';

@Module({
  controllers: [TypeDechetsController],
  providers: [TypeDechetsService]
})
export class TypeDechetsModule {}
