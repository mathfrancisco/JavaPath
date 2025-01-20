import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly supabase: SupabaseClient,
  ) {}

  async register(registerDto: RegisterUser) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const { data: user, error } = await this.supabase
      .from('users')
      .insert([{
        username: registerDto.username,
        email: registerDto.email,
        name: registerDto.fullName,
        password: hashedPassword,
        role: registerDto.role,
        created_at: new Date(),
      }])
      .select()
      .single();

    if (error) {
      throw new UnauthorizedException('Erro ao registrar usuário');
    }

    return this.generateToken(user);
  }

  async login(loginDto: LoginUser) {
    const { data: user, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('username', loginDto.username)
      .eq('role', loginDto.role)
      .single();

    if (error || !user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Atualizar último login
    await this.supabase
      .from('users')
      .update({ last_login: new Date() })
      .eq('id', user.id);

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        enrolledCourses: user.enrolled_courses,
        completedCourses: user.completed_courses,
        progress: user.progress,
        createdAt: user.created_at,
        lastLogin: user.last_login,
      },
    };
  }
}
