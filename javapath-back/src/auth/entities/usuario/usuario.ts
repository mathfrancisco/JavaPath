import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Curso } from '../cursos/entities/curso.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  })
  role: 'student' | 'instructor' | 'admin';

  @Column('int', { array: true, nullable: true })
  enrolledCourses: number[];

  @Column('int', { array: true, nullable: true })
  completedCourses: number[];

  @Column('jsonb', { nullable: true })
  progress: { [courseId: number]: number };

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @OneToMany(() => Curso, curso => curso.instructor)
  cursos: Curso[];

  // Adicionar relacionamentos com outras entidades
  @OneToMany(() => Comentario, comentario => comentario.autor)
  comentarios: Comentario[];

  @OneToMany(() => Post, post => post.autor)
  posts: Post[];
}
