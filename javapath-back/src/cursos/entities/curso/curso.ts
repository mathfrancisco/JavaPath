export class Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructorId: string;
  categoryIds: string[];
  thumbnail?: string;
  status: 'draft' | 'published' | 'archived';
  enrolledStudents: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
