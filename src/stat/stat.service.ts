import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    const [userCount, reportCount, transactionCount, rewardCount, redemptionCount] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.report.count(),
      this.prisma.trashTransaction.count(),
      this.prisma.reward.count(),
      this.prisma.redemption.count(),
    ]);

    const totalWeight = await this.prisma.trashTransaction.aggregate({
      _sum: { weight: true },
    });

    const totalValue = await this.prisma.trashTransaction.aggregate({
      _sum: { value: true },
    });

    return {
      totalUsers: userCount,
      totalReports: reportCount,
      totalTrashTransactions: transactionCount,
      totalTrashWeight: totalWeight._sum.weight || 0,
      totalTrashValue: totalValue._sum.value || 0,
      totalRewards: rewardCount,
      totalRedemptions: redemptionCount,
    };
  }

  async getWeeklyTrashStats() {
    const result = await this.prisma.trashTransaction.groupBy({
      by: ['createdAt'],
      _sum: { weight: true },
      orderBy: { createdAt: 'asc' },
    });

    return result.map((item) => ({
      date: item.createdAt.toISOString().split('T')[0],
      totalWeight: item._sum.weight ?? 0,
    }));
  }
  
  async weeklyTransactions() {
    return this.prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('week', "createdAt") AS week,
        COUNT(*) as total_transactions,
        SUM(weight) as total_weight
      FROM "TrashTransaction"
      GROUP BY week
      ORDER BY week DESC
      LIMIT 6
    `;
  }

  async weeklyReports() {
    return this.prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('week', "createdAt") AS week,
        COUNT(*) as total_reports
      FROM "Report"
      GROUP BY week
      ORDER BY week DESC
      LIMIT 6
    `;
  }
}
