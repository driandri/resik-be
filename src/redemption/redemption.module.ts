import { Module } from '@nestjs/common';
import { RedemptionService } from './redemption.service';
import { RedemptionController } from './redemption.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [RedemptionService],
  controllers: [RedemptionController],
})
export class RedemptionModule {}
