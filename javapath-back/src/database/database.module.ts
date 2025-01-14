import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  providers: [SupabaseService]
})
export class DatabaseModule {}
