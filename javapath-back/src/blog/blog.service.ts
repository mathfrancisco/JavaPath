import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Tag } from './entities/tag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  /**
   * Cria um novo post
   * @param createPostDto - Dados do post a ser criado
   * @param userId - ID do usuário que está criando o post
   */
  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const { tags: tagNames, ...postData } = createPostDto;
    
    // Cria ou encontra as tags existentes
    const tags = await Promise.all(
      (tagNames || []).map(name => 
        this.tagRepository.findOne({ where: { name } })
          .then(tag => tag || this.tagRepository.save({ name }))
      )
    );

    // Cria o post com as tags associadas
    const post = this.postRepository.create({
      ...postData,
      author: { id: userId },
      tags,
    });

    return this.postRepository.save(post);
  }

  /**
   * Busca todos os posts com filtros opcionais
   * @param query - Objeto com filtros de busca (tags e termo de pesquisa)
   */
  async findAll(query: { tags?: string[], search?: string } = {}) {
    const queryBuilder = this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.author', 'author')
      .where('post.published = :published', { published: true });

    // Aplica filtro por tags se fornecido
    if (query.tags?.length) {
      queryBuilder.andWhere('tag.name IN (:...tags)', { tags: query.tags });
    }

    // Aplica filtro de busca se fornecido
    if (query.search) {
      queryBuilder.andWhere(
        '(post.title ILIKE :search OR post.content ILIKE :search)',
        { search: `%${query.search}%` }
      );
    }

    return queryBuilder.getMany();
  }

  /**
   * Busca um post específico por ID
   * @param id - ID do post
   */
  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['tags', 'author'],
    });

    if (!post) {
      throw new NotFoundException(`Post com ID "${id}" não encontrado`);
    }

    return post;
  }

  /**
   * Atualiza um post existente
   * @param id - ID do post
   * @param updatePostDto - Dados a serem atualizados
   * @param userId - ID do usuário que está atualizando
   */
  async update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<Post> {
    const post = await this.findOne(id);
    
    // Verifica se o usuário é o autor do post
    if (post.author.id !== userId) {
      throw new UnauthorizedException('Você só pode atualizar seus próprios posts');
    }

    // Atualiza as tags se fornecidas
    if (updatePostDto.tags) {
      const tags = await Promise.all(
        updatePostDto.tags.map(name =>
          this.tagRepository.findOne({ where: { name } })
            .then(tag => tag || this.tagRepository.save({ name }))
        )
      );
      post.tags = tags;
    }

    // Atualiza os demais dados do post
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  /**
   * Remove um post
   * @param id - ID do post
   * @param userId - ID do usuário que está removendo
   */
  async remove(id: string, userId: string): Promise<void> {
    const post = await this.findOne(id);
    
    // Verifica se o usuário é o autor do post
    if (post.author.id !== userId) {
      throw new UnauthorizedException('Você só pode deletar seus próprios posts');
    }

    await this.postRepository.remove(post);
  }

  /**
   * Busca posts por autor
   * @param authorId - ID do autor
   */
  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { author: { id: authorId } },
      relations: ['tags'],
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Busca tags populares
   * @param limit - Limite de tags a serem retornadas
   */
  async getPopularTags(limit: number = 10): Promise<Tag[]> {
    return this.tagRepository
      .createQueryBuilder('tag')
      .loadRelationCountAndMap('tag.postCount', 'tag.posts')
      .orderBy('postCount', 'DESC')
      .limit(limit)
      .getMany();
  }
}
