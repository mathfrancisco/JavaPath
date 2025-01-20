import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUser {
  @IsEnum(['student', 'instructor'])
  role: 'student' | 'instructor';

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
