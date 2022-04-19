import { Test, TestingModule } from '@nestjs/testing';
import { TypeDechetsService } from './type-dechets.service';

describe('TypeDechetsService', () => {
  let service: TypeDechetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeDechetsService],
    }).compile();

    service = module.get<TypeDechetsService>(TypeDechetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
