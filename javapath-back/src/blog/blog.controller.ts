// blog.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @GetUser('id') userId: string) {
    return this.blogService.create(createPostDto, userId);
  }

  @Get()
  findAll(@Query('tags') tags?: string[], @Query('search') search?: string) {
    return this.blogService.findAll({ tags, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser('id') userId: string,
  ) {
    return this.blogService.update(id, updatePostDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.blogService.remove(id, userId);
  }
}
