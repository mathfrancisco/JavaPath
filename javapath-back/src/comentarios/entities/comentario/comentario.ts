import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from '../blog/entities/post.entity';

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  conteudo: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @Column({ default: false })
  moderado: boolean;

  @ManyToOne(() => User, user => user.comentarios)
  autor: User;

  @ManyToOne(() => Post, post => post.comentarios)
  post: Post;

  @ManyToOne(() => Comentario, { nullable: true })
  comentarioPai: Comentario;
}
