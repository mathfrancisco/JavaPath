// src/app/shared/types/course.types.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  imageUrl: string;
  price: number;
  duration: string;
  level: string;
  rating: number;
  totalStudents: number;
  categories: string[];
  status: 'draft' | 'published' | 'archived';
  modules: CourseModule[];
  lastUpdate: Date;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  videoUrl?: string;
  materials: Material[];
  exercises: Exercise[];
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'exercise';
  url: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  points: number;
}

export interface CursoInstructor {
  id: number;
  title: string;
  description: string;
  instructor: string;
  imageUrl: string;
  price: number;
  duration: string;
  level: string;
  rating: number;
  totalStudents: number;
  categories: string[];
  status: 'rascunho' | 'publicado' | 'revisao';
  modules: CourseModule[];
  lastUpdate: Date;
}

export interface CursoConteudo {
  id?: number;
  titulo: string;
  tipo: 'video' | 'pdf' | 'quiz';
  url: string;
  duracao?: number;
}

export interface CursoAnalytics {
  visualizacoes: number;
  alunosAtivos: number;
  avaliacaoMedia: number;
  receitaTotal: number;
  taxaConclusao: number;
  engajamentoPorAula: {
    aulaId: number;
    visualizacoes: number;
    tempoMedio: number;
  }[];
}

export interface InstructorStats {
  totalAlunos: number;
  totalCursos: number;
  avaliacaoMedia: number;
  receitaTotal: number;
  alunosAtivos: number;
  visualizacoesTotais: number;
}


