// comentarios.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createComentarioDto: CreateComentarioDto,
    @GetUser('id') userId: string,
  ) {
    return this.comentariosService.create(createComentarioDto, userId);
  }

  @Get('post/:postId')
  findAllByPost(@Param('postId') postId: string) {
    return this.comentariosService.findAllByPost(postId);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  findAllByUser(@GetUser('id') userId: string) {
    return this.comentariosService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateComentarioDto: UpdateComentarioDto,
    @GetUser('id') userId: string,
  ) {
    return this.comentariosService.update(id, updateComentarioDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.comentariosService.remove(id, userId);
  }

  @Patch(':id/moderate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  moderate(@Param('id') id: string, @Body('moderado') moderado: boolean) {
    return this.comentariosService.moderate(id, moderado);
  }
}
