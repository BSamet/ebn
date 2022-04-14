import { Test, TestingModule } from '@nestjs/testing';
import { RamassageService } from './ramassage.service';

describe('RamassageService', () => {
  let service: RamassageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamassageService],
    }).compile();

    service = module.get<RamassageService>(RamassageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
