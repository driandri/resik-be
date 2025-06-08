import { Controller, Post, Get, Body, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadService } from '../upload/upload.service';
import { Request } from 'express';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly uploadService: UploadService,
  ) {}

@Post()
async create(@Req() req: Request, @Body() body: { description: string; imageBase64: string }) {
  const userId = req.user.sub;
  const imageUrl = await this.uploadService.uploadImage(body.imageBase64);
  return this.reportService.create(userId, {
    description: body.description,
    imageUrl,
  });
}

  @Get('me')
  findMine(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.reportService.findByUser(userId);
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: 'VERIFIED' | 'REJECTED' }) {
    return this.reportService.updateStatus(id, body.status);
  }
}
