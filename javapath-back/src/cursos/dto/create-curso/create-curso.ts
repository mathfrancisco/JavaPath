import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, IsEnum } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  instructorId: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  categoryIds: string[];

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsEnum(['draft', 'published', 'archived'])
  @IsNotEmpty()
  status: 'draft' | 'published' | 'archived';
}
