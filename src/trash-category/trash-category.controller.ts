import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TrashCategoryService } from './trash-category.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrashCategoryController {
  constructor(private readonly service: TrashCategoryService) {}

  // Admin only
  @Post()
  @Roles('ADMIN')
  create(@Body() body: { name: string; iconUrl?: string }) {
    return this.service.create(body);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @Roles('ADMIN')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  // User & admin
  @Get()
  @Roles('USER', 'ADMIN')
  findAll() {
    return this.service.findAll();
  }
}
