import { Test, TestingModule } from '@nestjs/testing';
import { TourneeService } from './tournee.service';

describe('TourneeService', () => {
  let service: TourneeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourneeService],
    }).compile();

    service = module.get<TourneeService>(TourneeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
