import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursosModule } from './cursos/cursos.module';
import { BlogModule } from './blog/blog.module';
import { ComentariosModule } from './comentarios/comentarios.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [CursosModule, BlogModule, ComentariosModule, AuthModule, DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_HOST,
      port: Number(process.env.SUPABASE_PORT),
      username: process.env.SUPABASE_USER,
      password: process.env.SUPABASE_PASSWORD,
      database: process.env.SUPABASE_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // Only true in development
      ssl: {
        rejectUnauthorized: false // Required for Supabase
      }
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
