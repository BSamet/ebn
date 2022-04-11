import { Test, TestingModule } from '@nestjs/testing';
import { TourneeController } from './tournee.controller';
import { TourneeService } from './tournee.service';

describe('TourneeController', () => {
  let controller: TourneeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourneeController],
      providers: [TourneeService],
    }).compile();

    controller = module.get<TourneeController>(TourneeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
