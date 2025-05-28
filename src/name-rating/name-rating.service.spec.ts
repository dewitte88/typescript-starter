import { Test, TestingModule } from '@nestjs/testing';
import { NameRatingService } from './name-rating.service';

describe('NameRatingService', () => {
  let service: NameRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NameRatingService],
    }).compile();

    service = module.get<NameRatingService>(NameRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
