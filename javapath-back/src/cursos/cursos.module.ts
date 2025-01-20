import { Module } from '@nestjs/common';
import { CoursesController } from './cursos.controller';
import { CoursesService } from './cursos.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CursosModule {}
