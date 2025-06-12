import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RewardService } from 'src/reward/reward.service';

@Injectable()
export class TrashTransactionService {
  constructor(private prisma: PrismaService, private rewardService: RewardService) {}

  async create(userId: string, dto: { category: string; weight: number; imageUrl?: string }) {
    return this.prisma.trashTransaction.create({
      data: {
        ...dto,
        userId,
        status: 'PENDING',
      },
    });
  }

  findAll() {
    return this.prisma.trashTransaction.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByUser(userId: string) {
    return this.prisma.trashTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async verify(id: string, value: number) {
    const tx = await this.prisma.trashTransaction.update({
      where: { id },
      data: {
        status: 'VERIFIED',
        verifiedAt: new Date(),
        value,
      },
    });

    await this.rewardService.addPoints(tx.userId, value); 

    return tx;
  }

  reject(id: string) {
    return this.prisma.trashTransaction.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }
}
