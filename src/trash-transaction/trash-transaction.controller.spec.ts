import { Test, TestingModule } from '@nestjs/testing';
import { TrashTransactionController } from './trash-transaction.controller';

describe('TrashTransactionController', () => {
  let controller: TrashTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrashTransactionController],
    }).compile();

    controller = module.get<TrashTransactionController>(TrashTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
