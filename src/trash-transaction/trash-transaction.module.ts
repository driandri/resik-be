import { Module } from '@nestjs/common';
import { TrashTransactionService } from './trash-transaction.service';
import { TrashTransactionController } from './trash-transaction.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // for JwtAuthGuard & RolesGuard
import { RewardModule } from 'src/reward/reward.module';

@Module({
  imports: [PrismaModule, AuthModule, RewardModule],
  controllers: [TrashTransactionController],
  providers: [TrashTransactionService],
})
export class TrashTransactionModule {}
