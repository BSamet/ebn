import { Test, TestingModule } from '@nestjs/testing';
import { RamassageController } from './ramassagePonctuel.controller';
import { RamassagePonctuelService } from './ramassagePonctuel.service';

describe('RamassageController', () => {
  let controller: RamassageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RamassageController],
      providers: [RamassagePonctuelService],
    }).compile();

    controller = module.get<RamassageController>(RamassageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
