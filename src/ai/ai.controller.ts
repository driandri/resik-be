import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('ai')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('classify')
  @Roles('USER', 'ADMIN')
  classify(@GetUser('id') userId: string, @Body('imageUrl') imageUrl: string) {
    return this.aiService.classifyImageAndSave(userId, imageUrl);
  }
}
