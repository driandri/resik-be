import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { RedemptionService } from './redemption.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('redemptions')
@UseGuards(JwtAuthGuard)
export class RedemptionController {
  constructor(private readonly redemptionService: RedemptionService) {}

  @Post()
  redeem(@GetUser('id') userId: string, @Body('rewardId') rewardId: string) {
    return this.redemptionService.redeem(userId, rewardId);
  }

  @Get()
  myRedemptions(@GetUser('id') userId: string) {
    return this.redemptionService.findMyRedemptions(userId);
  }
}
