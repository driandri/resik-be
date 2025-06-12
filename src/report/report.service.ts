import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Report } from '@prisma/client';
import { RewardService } from 'src/reward/reward.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService, private rewardService: RewardService) {}

  create(userId: string, data: { description: string; imageUrl: string }) {
    return this.prisma.report.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async verifyReport(reportId: string): Promise<Report> {
    const report = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        status: 'VERIFIED',
        verifiedAt: new Date(),
      },
    });

    await this.rewardService.addPoints(report.userId, 10);
    return report;
  }



  findAll() {
    return this.prisma.report.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByUser(userId: string) {
    return this.prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  updateStatus(reportId: string, status: 'VERIFIED' | 'REJECTED') {
    return this.prisma.report.update({
      where: { id: reportId },
      data: { status },
    });
  }
}

