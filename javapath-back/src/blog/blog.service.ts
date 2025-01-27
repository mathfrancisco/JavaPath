

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Post } from './entities/post/post.entity';
import { Tag } from './entities/post/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}

@Injectable()
export class BlogService {
  constructor(
      @InjectRepository(Post)
      private readonly postRepository: Repository<Post>,
      @InjectRepository(Tag)
      private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const { tags: tagNames, ...postData } = createPostDto;

    // Create or find tags
    const tags = await Promise.all(
        (tagNames || []).map(name =>
            this.tagRepository.findOne({ where: { name } })
                .then(tag => tag || this.tagRepository.save({ name }))
        )
    );

    const post = this.postRepository.create({
      ...postData,
      author: { id: userId },
      tags,
    });

    return this.postRepository.save(post);
  }

  async findAll(query: { tags?: string[], search?: string } = {}) {
    const queryBuilder = this.postRepository.createQueryBuilder('post')
        .leftJoinAndSelect('post.tags', 'tag')
        .leftJoinAndSelect('post.author', 'author')
        .where('post.published = :published', { published: true });

    if (query.tags?.length) {
      queryBuilder.andWhere('tag.name IN (:...tags)', { tags: query.tags });
    }

    if (query.search) {
      queryBuilder.andWhere(
          '(post.title ILIKE :search OR post.content ILIKE :search)',
          { search: `%${query.search}%` }
      );
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['tags', 'author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<Post> {
    const post = await this.findOne(id);

    if (post.author.id !== userId) {
      throw new UnauthorizedException('You can only update your own posts');
    }

    if (updatePostDto.tags) {
      const tags = await Promise.all(
          updatePostDto.tags.map(name =>
              this.tagRepository.findOne({ where: { name } })
                  .then(tag => tag || this.tagRepository.save({ name }))
          )
      );
      post.tags = tags;
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: string, userId: string): Promise<void> {
    const post = await this.findOne(id);

    if (post.author.id !== userId) {
      throw new UnauthorizedException('You can only delete your own posts');
    }

    await this.postRepository.remove(post);
  }
}
