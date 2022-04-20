import { Test, TestingModule } from '@nestjs/testing';
import { RamassageAbonnementService } from './ramassage-abonnement.service';

describe('RamassageAbonnementService', () => {
  let service: RamassageAbonnementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RamassageAbonnementService],
    }).compile();

    service = module.get<RamassageAbonnementService>(RamassageAbonnementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
