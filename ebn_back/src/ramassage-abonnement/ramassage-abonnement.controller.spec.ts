import { Test, TestingModule } from '@nestjs/testing';
import { RamassageAbonnementController } from './ramassage-abonnement.controller';
import { RamassageAbonnementService } from './ramassage-abonnement.service';

describe('RamassageAbonnementController', () => {
  let controller: RamassageAbonnementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RamassageAbonnementController],
      providers: [RamassageAbonnementService],
    }).compile();

    controller = module.get<RamassageAbonnementController>(RamassageAbonnementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
