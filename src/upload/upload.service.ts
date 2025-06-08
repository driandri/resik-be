// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY // gunakan service_role key dari Supabase project settings
    );
  }

  async uploadImage(base64: string): Promise<string> {
    const buffer = Buffer.from(base64, 'base64');
    const fileName = `report-${uuidv4()}.jpg`;

    const { error } = await this.supabase.storage
      .from('report-images')
      .upload(fileName, buffer, {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    return `${process.env.SUPABASE_URL}/storage/v1/object/public/report-images/${fileName}`;
  }
}
