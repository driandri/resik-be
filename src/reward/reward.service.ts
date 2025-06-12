import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}

  async addPoints(userId: string, amount: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        points: {
          increment: amount,
        },
      },
    });
  }

  async deductPoints(userId: string, amount: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        points: {
          decrement: amount,
        },
      },
    });
  }

  async getPoints(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { points: true },
    });
    return user?.points ?? 0;
  }
}
