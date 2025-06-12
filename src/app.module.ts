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
import { RewardService } from './reward/reward.service';
import { RewardController } from './reward/reward.controller';
import { RewardModule } from './reward/reward.module';
import { TrashTransactionModule } from './trash-transaction/trash-transaction.module';
import { ConfigModule } from '@nestjs/config';
import { RedemptionModule } from './redemption/redemption.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule, DetectionModule, TransactionsModule, LocationsModule, PickupModule, UserModule, PrismaModule, ReportModule, UploadModule, RewardModule, TrashTransactionModule, RedemptionModule
  ],
  controllers: [AppController, RewardController],
  providers: [AppService, PrismaService, UploadService, RewardService],
})
export class AppModule {}
