import { Test, TestingModule } from '@nestjs/testing';
import { ConteneurController } from './conteneur.controller';
import { ConteneurService } from './conteneur.service';

describe('ConteneurController', () => {
  let controller: ConteneurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConteneurController],
      providers: [ConteneurService],
    }).compile();

    controller = module.get<ConteneurController>(ConteneurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
