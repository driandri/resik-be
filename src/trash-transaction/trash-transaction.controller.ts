import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { TrashTransactionService } from './trash-transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../auth/get-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transactions')
export class TrashTransactionController {
  constructor(private readonly service: TrashTransactionService) {}

  @Post()
  @Roles('USER')
  create(@Body() body: any, @GetUser('id') userId: string) {
    return this.service.create(userId, body);
  }

  @Get('me')
  @Roles('USER')
  getMine(@GetUser('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get()
  @Roles('ADMIN')
  getAll() {
    return this.service.findAll();
  }

  @Post(':id/verify')
  @Roles('ADMIN')
  verify(@Param('id') id: string, @Body('value') value: number) {
    return this.service.verify(id, value);
  }

  @Post(':id/reject')
  @Roles('ADMIN')
  reject(@Param('id') id: string) {
    return this.service.reject(id);
  }
}
