import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService], // <- agar bisa diakses dari modul lain
})
export class RewardModule {}
