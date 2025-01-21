// comentarios.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { Comentario } from './entities/comentario.entity';
import { Post } from '../blog/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario, Post])],
  controllers: [ComentariosController],
  providers: [ComentariosService],
  exports: [ComentariosService],
})
export class ComentariosModule {}
