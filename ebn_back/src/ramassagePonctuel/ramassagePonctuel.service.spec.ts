import { Test, TestingModule } from '@nestjs/testing';
import { RamassagePonctuelService } from './ramassagePonctuel.service';

describe('RamassagePonctuelService', () => {
  let service: RamassagePonctuelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamassagePonctuelService],
    }).compile();

    service = module.get<RamassagePonctuelService>(RamassagePonctuelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
