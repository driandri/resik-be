import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";

@Module({
  providers: [UploadService],
  exports: [UploadService], // jika ingin digunakan di module lain
})
export class UploadModule {}
