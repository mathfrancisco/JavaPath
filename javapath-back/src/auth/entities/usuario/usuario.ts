export class Usuario {
  id: string;
  username: string;
  email: string;
  name: string;
  password: string; // Será hasheada
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses?: number[];
  completedCourses?: number[];
  progress?: { [courseId: number]: number };
  createdAt: Date;
  lastLogin?: Date;
}
