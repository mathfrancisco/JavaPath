import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  @IsNotEmpty()
  conteudo: string;

  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @IsUUID()
  @IsOptional()
  comentarioPaiId?: string;
}

