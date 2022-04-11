import { Module } from '@nestjs/common';
import { TourneeService } from './tournee.service';
import { TourneeController } from './tournee.controller';

@Module({
  controllers: [TourneeController],
  providers: [TourneeService]
})
export class TourneeModule {}
