import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatService } from './stat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stats')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @Get('overview')
  @Roles('ADMIN')
  getOverview() {
    return this.statService.getOverview();
  }

  @Get('weekly-transactions')
  @Roles('ADMIN')
  getWeeklyTransactions() {
    return this.statService.weeklyTransactions();
  }

  @Get('weekly-reports')
  @Roles('ADMIN')
  getWeeklyReports() {
    return this.statService.weeklyReports();
  }

  @Get('weekly-trash')
  @Roles('ADMIN')
  getWeeklyStats() {
    return this.statService.getWeeklyTrashStats();
  }
}
