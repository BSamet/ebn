import { Test, TestingModule } from '@nestjs/testing';
import { RamassageController } from './ramassage.controller';
import { RamassageService } from './ramassage.service';

describe('RamassageController', () => {
  let controller: RamassageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RamassageController],
      providers: [RamassageService],
    }).compile();

    controller = module.get<RamassageController>(RamassageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
