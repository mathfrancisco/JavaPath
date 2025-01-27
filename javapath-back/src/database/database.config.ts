import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
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
});
