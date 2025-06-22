import { Test, TestingModule } from '@nestjs/testing';
import { TrashCategoryController } from './trash-category.controller';

describe('TrashCategoryController', () => {
  let controller: TrashCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrashCategoryController],
    }).compile();

    controller = module.get<TrashCategoryController>(TrashCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
