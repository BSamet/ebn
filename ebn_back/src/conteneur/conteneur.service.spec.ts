import { Test, TestingModule } from '@nestjs/testing';
import { ConteneurService } from './conteneur.service';

describe('ConteneurService', () => {
  let service: ConteneurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConteneurService],
    }).compile();

    service = module.get<ConteneurService>(ConteneurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
