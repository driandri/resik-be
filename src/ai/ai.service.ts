import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async classifyImageAndSave(userId: string, imageUrl: string) {
    // Simulasi AI klasifikasi berdasarkan nama gambar
    const lowerUrl = imageUrl.toLowerCase();
    let categoryName = 'Lainnya';

    if (lowerUrl.includes('plastik')) categoryName = 'Plastik';
    else if (lowerUrl.includes('kertas')) categoryName = 'Kertas';
    else if (lowerUrl.includes('kaca')) categoryName = 'Kaca';
    else if (lowerUrl.includes('logam')) categoryName = 'Logam';

    // Cari kategori di DB
    const category = await this.prisma.trashCategory.findFirst({
      where: { name: categoryName },
    });

    if (!category) throw new NotFoundException('Kategori tidak ditemukan');

    // Simpan sebagai transaksi
    const result = await this.prisma.trashTransaction.create({
      data: {
        userId,
        categoryId: category.id,
        imageUrl,
        weight: 1.0, // default berat dummy
        status: 'PENDING',
      },
    });

    return {
      message: 'Gambar berhasil diklasifikasikan dan disimpan',
      kategori: categoryName,
      transaksi: result,
    };
  }
}
