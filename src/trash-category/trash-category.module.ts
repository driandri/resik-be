import { Module } from '@nestjs/common';
import { TrashCategoryService } from './trash-category.service';
import { TrashCategoryController } from './trash-category.controller';

@Module({
  providers: [TrashCategoryService],
  controllers: [TrashCategoryController]
})
export class TrashCategoryModule {}
