import { Test, TestingModule } from '@nestjs/testing';
import { TypeDechetsController } from './type-dechets.controller';
import { TypeDechetsService } from './type-dechets.service';

describe('TypeDechetsController', () => {
  let controller: TypeDechetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeDechetsController],
      providers: [TypeDechetsService],
    }).compile();

    controller = module.get<TypeDechetsController>(TypeDechetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
