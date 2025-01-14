// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  username: string;
  // ... outras informações do usuário
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;



  constructor(private router: Router) {
    let user = localStorage.getItem('currentUser')

    this.currentUserSubject = new BehaviorSubject<User | null>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();

  }



  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }



  login(username: string) {  // , password: string - removido, pois não há backend
    // Simulação de login (substitua pela sua lógica de autenticação)
    const user: User = { username };
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user)); // Armazena os dados do usuário no localStorage
    this.router.navigate(['/perfil']);
  }


  logout() {
    // Remove os dados do usuário do localStorage
    localStorage.removeItem('currentUser')

    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);

  }


  // registro(username: string, password: string) {
  //     // Simulação de registro (substitua pela sua lógica de registro)
  //     this.users.push({ username, password }); // Simulando um banco de dados de usuários
  //     this.login(username, password);
  // }

}


