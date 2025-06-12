import { Controller, Get, UseGuards } from '@nestjs/common';
import { RewardService } from './reward.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('me')
  getMyPoints(@GetUser('id') userId: string) {
    return this.rewardService.getPoints(userId);
  }
}
