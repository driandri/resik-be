import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrashCategoryService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.trashCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }

  create(dto: { name: string; iconUrl?: string }) {
    return this.prisma.trashCategory.create({ data: dto });
  }

  update(id: string, dto: { name?: string; iconUrl?: string }) {
    return this.prisma.trashCategory.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: string) {
    return this.prisma.trashCategory.delete({
      where: { id },
    });
  }
}
