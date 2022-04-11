import { Test, TestingModule } from '@nestjs/testing';
import { CollecteurService } from './collecteur.service';

describe('CollecteurService', () => {
  let service: CollecteurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollecteurService],
    }).compile();

    service = module.get<CollecteurService>(CollecteurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
