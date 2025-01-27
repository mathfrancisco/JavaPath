import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('SUPABASE_HOST'),
        port: configService.get('SUPABASE_PORT'),
        username: configService.get('SUPABASE_USER'),
        password: configService.get('SUPABASE_PASSWORD'),
        database: configService.get('SUPABASE_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [SupabaseService],
  exports: [SupabaseService, TypeOrmModule],
})
export class DatabaseModule {}
