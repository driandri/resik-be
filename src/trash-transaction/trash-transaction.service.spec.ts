import { Test, TestingModule } from '@nestjs/testing';
import { TrashTransactionService } from './trash-transaction.service';

describe('TrashTransactionService', () => {
  let service: TrashTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrashTransactionService],
    }).compile();

    service = module.get<TrashTransactionService>(TrashTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
