import { Test, TestingModule } from '@nestjs/testing';
import { TrashCategoryService } from './trash-category.service';

describe('TrashCategoryService', () => {
  let service: TrashCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrashCategoryService],
    }).compile();

    service = module.get<TrashCategoryService>(TrashCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
