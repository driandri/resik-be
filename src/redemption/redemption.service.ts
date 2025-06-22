import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RedemptionService {
  constructor(private prisma: PrismaService) {}

  async redeem(userId: string, rewardId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const reward = await this.prisma.reward.findUnique({ where: { id: rewardId } });

    if (!user || !reward) throw new BadRequestException('User or Reward not found');
    if (user.points < reward.pointsCost)
      throw new BadRequestException('Not enough points');

    // Transaksi: kurangi poin dan simpan redemption
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { points: { decrement: reward.pointsCost } },
      }),
      this.prisma.redemption.create({
        data: {
          userId,
          rewardId,
        },
      }),
    ]);

    return { message: 'Reward redeemed successfully', reward };
  }

  async findMyRedemptions(userId: string) {
    return this.prisma.redemption.findMany({
      where: { userId },
      include: { reward: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
