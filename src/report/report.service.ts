import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, data: { description: string; imageUrl: string }) {
    return this.prisma.report.create({
      data: {
        ...data,
        userId,
      },
    });
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
