import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UploadModule } from 'src/upload/upload.module';
import { RewardModule } from 'src/reward/reward.module';

@Module({
  imports: [UploadModule, RewardModule],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
