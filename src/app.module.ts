import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DetectionModule } from './detection/detection.module';
import { TransactionsModule } from './transactions/transactions.module';
import { LocationsModule } from './locations/locations.module';
import { PickupModule } from './pickup/pickup.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ReportModule } from './report/report.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AuthModule, DetectionModule, TransactionsModule, LocationsModule, PickupModule, UserModule, PrismaModule, ReportModule, UploadModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UploadService],
})
export class AppModule {}
