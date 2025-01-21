// comentarios.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './entities/comentario.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Post } from '../blog/entities/post.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createComentarioDto: CreateComentarioDto, userId: string): Promise<Comentario> {
    const post = await this.postRepository.findOne({
      where: { id: createComentarioDto.postId },
    });

    if (!post) {
      throw new NotFoundException(`Post com ID "${createComentarioDto.postId}" não encontrado`);
    }

    let comentarioPai: Comentario | null = null;
    if (createComentarioDto.comentarioPaiId) {
      comentarioPai = await this.comentarioRepository.findOne({
        where: { id: createComentarioDto.comentarioPaiId },
      });

      if (!comentarioPai) {
        throw new NotFoundException(
          `Comentário pai com ID "${createComentarioDto.comentarioPaiId}" não encontrado`,
        );
      }
    }

    const comentario = this.comentarioRepository.create({
      conteudo: createComentarioDto.conteudo,
      post,
      autor: { id: userId },
      comentarioPai,
    });

    return this.comentarioRepository.save(comentario);
  }

  async findAllByPost(postId: string): Promise<Comentario[]> {
    return this.comentarioRepository.find({
      where: { post: { id: postId } },
      relations: ['autor', 'comentarioPai'],
      order: { criadoEm: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Comentario> {
    const comentario = await this.comentarioRepository.findOne({
      where: { id },
      relations: ['autor', 'post', 'comentarioPai'],
    });

    if (!comentario) {
      throw new NotFoundException(`Comentário com ID "${id}" não encontrado`);
    }

    return comentario;
  }

  async update(
    id: string,
    updateComentarioDto: UpdateComentarioDto,
    userId: string,
  ): Promise<Comentario> {
    const comentario = await this.findOne(id);

    if (comentario.autor.id !== userId) {
      throw new UnauthorizedException('Você só pode editar seus próprios comentários');
    }

    Object.assign(comentario, updateComentarioDto);
    return this.comentarioRepository.save(comentario);
  }

  async remove(id: string, userId: string): Promise<void> {
    const comentario = await this.findOne(id);

    if (comentario.autor.id !== userId) {
      throw new UnauthorizedException('Você só pode deletar seus próprios comentários');
    }

    await this.comentarioRepository.remove(comentario);
  }

  async moderate(id: string, moderado: boolean): Promise<Comentario> {
    const comentario = await this.findOne(id);
    comentario.moderado = moderado;
    return this.comentarioRepository.save(comentario);
  }

  async findAllByUser(userId: string): Promise<Comentario[]> {
    return this.comentarioRepository.find({
      where: { autor: { id: userId } },
      relations: ['post'],
      order: { criadoEm: 'DESC' },
    });
  }
}
