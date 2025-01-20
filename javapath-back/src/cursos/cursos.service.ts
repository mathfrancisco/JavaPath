import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FilterCoursesDto } from './dto/filter-courses.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly supabase: SupabaseClient) {}

  async findAll(filterDto: FilterCoursesDto) {
    let query = this.supabase.from('courses').select('*');

    if (filterDto.search) {
      query = query.ilike('title', `%${filterDto.search}%`);
    }

    if (filterDto.categoryId) {
      query = query.contains('categoryIds', [filterDto.categoryId]);
    }

    if (filterDto.instructorId) {
      query = query.eq('instructorId', filterDto.instructorId);
    }

    if (filterDto.status) {
      query = query.eq('status', filterDto.status);
    }

    const { data: courses, error } = await query;

    if (error) {
      throw new BadRequestException('Erro ao buscar cursos');
    }

    return courses;
  }

  async findOne(id: string) {
    const { data: course, error } = await this.supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !course) {
      throw new NotFoundException('Curso não encontrado');
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    const { data: course, error } = await this.supabase
      .from('courses')
      .insert([{
        ...createCourseDto,
        enrolledStudents: 0,
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
      .select()
      .single();

    if (error) {
      throw new BadRequestException('Erro ao criar curso');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const { data: course, error } = await this.supabase
      .from('courses')
      .update({
        ...updateCourseDto,
        updatedAt: new Date(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new BadRequestException('Erro ao atualizar curso');
    }

    return course;
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      throw new BadRequestException('Erro ao remover curso');
    }

    return { message: 'Curso removido com sucesso' };
  }
}
