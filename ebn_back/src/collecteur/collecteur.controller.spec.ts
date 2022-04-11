import { Test, TestingModule } from '@nestjs/testing';
import { CollecteurController } from './collecteur.controller';
import { CollecteurService } from './collecteur.service';

describe('CollecteurController', () => {
  let controller: CollecteurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollecteurController],
      providers: [CollecteurService],
    }).compile();

    controller = module.get<CollecteurController>(CollecteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
