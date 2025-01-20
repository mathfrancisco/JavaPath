# JavaPath - Plataforma de Aprendizado Java 🚀

<p align="center">
  <img src="frontend/src/assets/logo.png" alt="Logo JavaPath" width="200">
</p>

> Sua jornada definitiva no aprendizado de Java e tecnologias relacionadas

## 🌟 Sobre o Projeto

JavaPath é uma plataforma educacional moderna focada em proporcionar uma experiência de aprendizado imersiva em Java e tecnologias do ecossistema. Com conteúdo estruturado, hands-on e mentoria, ajudamos desenvolvedores a dominarem Java desde o básico até aplicações empresariais.

## ✨ Funcionalidades

### Para Alunos
- **Trilhas de Aprendizado** 📚
  - Jornadas estruturadas do básico ao avançado
  - Projetos práticos em cada módulo
  - Exercícios interativos com feedback em tempo real

- **Conteúdo Rico** 🎯
  - Videoaulas em HD com legendas
  - Material complementar em PDF
  - Códigos-fonte comentados
  - Projetos práticos do mundo real

- **Comunidade Ativa** 💬
  - Fóruns de discussão por módulo
  - Sessões de código ao vivo
  - Networking com outros devs

### Para Instrutores
- **Gerenciamento de Conteúdo** 📝
  - Dashboard intuitivo
  - Upload de vídeos e materiais
  - Análise de engajamento dos alunos

- **Interação com Alunos** 👥
  - Sistema de comentários em aulas
  - Fórums moderados
  - Feedback personalizado

## 🛠️ Stack Tecnológica

### Frontend
- **Angular 18**
  - Arquitetura modular
  - Componentes reutilizáveis
  - Estado gerenciado com NgRx
  
- **UI/UX**
  - Tailwind CSS para estilização
  - Componentes personalizados
  - Design responsivo
  - Temas claro/escuro

### Backend
- **NestJS**
  - Arquitetura limpa
  - Modules bem estruturados
  - Swagger para documentação

- **Banco de Dados**
  - PostgreSQL via Supabase
  - Migrations automatizadas
  - Backup diário

- **Infraestrutura**
  - Deploy automático na Netlify
  - CI/CD com GitHub Actions
  - Monitoramento com Sentry

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- PostgreSQL 14+

### Frontend
```bash
# Instalar dependências
cd frontend
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Iniciar em desenvolvimento
npm run start

# Build para produção
npm run build
```

### Backend
```bash
# Instalar dependências
cd backend
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Migrations
npm run migration:run

# Iniciar em desenvolvimento
npm run start:dev

# Build para produção
npm run build
```

## 📚 Documentação

### API Endpoints

#### Cursos
- `GET /api/courses` - Lista cursos
- `GET /api/courses/:id` - Detalhes do curso
- `POST /api/courses` - Cria curso (Auth)
- `PUT /api/courses/:id` - Atualiza curso (Auth)
- `DELETE /api/courses/:id` - Remove curso (Auth)

#### Aulas
- `GET /api/lessons` - Lista aulas
- `GET /api/lessons/:id` - Detalhes da aula
- `POST /api/lessons` - Cria aula (Auth)
- `PUT /api/lessons/:id` - Atualiza aula (Auth)
- `DELETE /api/lessons/:id` - Remove aula (Auth)

#### Usuários
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil (Auth)

### Estrutura do Projeto

```
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── shared/
│   │   ├── assets/
│   │   └── styles/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   ├── shared/
│   │   └── main.ts
│   └── package.json
│
└── README.md
```

## 📦 Deploy
### Deploy do Backend (Render)
### Preparação do Projeto

### Configurar Scripts no package.json

{
  "scripts": {
    "start:prod": "node dist/main",
    "build": "nest build"
  }
}

### Configurar Variáveis de Ambiente
### Crie um arquivo .env com as seguintes variáveis:

SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SECRET_KEY=your-service-role-key
PORT=3000
JWT_SECRET=your_jwt_secret

### Configurar main.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

## Deploy no Render

### Preparar Repositório

git init
git add .
git commit -m "Deploy para Render"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/seu-repo.git
git push -u origin main

### Configurar no Render


- Acesse render.com
- Crie novo Web Service
- Conecte ao repositório GitHub
- Configure o serviço:

- Build Command: npm run build
- Start Command: npm run start:prod


### Configurar Variáveis de Ambiente no Render

SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SECRET_KEY
JWT_SECRET
PORT (opcional)


### CORS para Produção

// main.ts
app.enableCors({
  origin: ['https://seu-frontend.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
});

# Plano de Implementação JavaPath

## Fase 1: Configuração Inicial e Autenticação (2 semanas)

### Semana 1: Setup do Projeto
1. Configuração do ambiente de desenvolvimento
   - Instalação das dependências
   - Configuração do PostgreSQL via Supabase
   - Setup inicial do NestJS e Angular
   - Configuração do ESLint e Prettier

2. Implementação da estrutura base do banco de dados
   - Criação das migrations iniciais
   - Configuração do Supabase
   - Implementação das entidades base

### Semana 2: Sistema de Autenticação
1. Backend (auth module)
   - Implementação do registro de usuários
   - Implementação do login
   - Configuração do JWT Guard
   - Endpoints de recuperação de senha

2. Frontend (auth module)
   - Implementação dos componentes de login
   - Implementação do registro
   - Telas de recuperação de senha
   - Guardas de rota Angular

## Fase 2: Módulo de Cursos (3 semanas)

### Semana 3: Backend de Cursos
1. Implementação do módulo de cursos
   - CRUD completo de cursos
   - Relacionamentos com usuários
   - Sistema de categorias
   - Endpoints para listagem e filtragem

2. Testes unitários e de integração
   - Testes dos controllers
   - Testes dos services
   - Testes de integração

### Semana 4-5: Frontend de Cursos
1. Implementação das páginas de cursos
   - Lista de cursos com filtros
   - Página de detalhes do curso
   - Sistema de busca
   - Componentes de card e carrossel

2. Área do instrutor
   - Dashboard de gerenciamento
   - CRUD de cursos
   - Upload de materiais
   - Análise de engajamento

## Fase 3: Blog e Comentários (2 semanas)

### Semana 6: Backend de Blog e Comentários
1. Implementação do módulo de blog
   - CRUD de posts
   - Sistema de tags
   - Endpoints para listagem e filtragem

2. Implementação do módulo de comentários
   - CRUD de comentários
   - Sistema de moderação
   - Notificações

### Semana 7: Frontend de Blog e Comentários
1. Implementação das páginas de blog
   - Lista de posts
   - Página de post individual
   - Sistema de comentários
   - Moderação de comentários

## Fase 4: Áreas Específicas e Refinamentos (3 semanas)

### Semana 8: Área do Aluno
1. Backend
   - Progress tracking
   - Sistema de notas
   - Histórico de atividades

2. Frontend
   - Dashboard do aluno
   - Visualização de progresso
   - Lista de cursos matriculados

### Semana 9: Área Administrativa
1. Backend
   - Métricas e relatórios
   - Gerenciamento de usuários
   - Configurações do sistema

2. Frontend
   - Dashboard administrativo
   - Relatórios e análises
   - Configurações gerais

### Semana 10: Refinamentos e Deploy
1. Otimizações
   - Performance do frontend
   - Caching no backend
   - Otimização de queries

2. Deploy
   - Configuração do CI/CD
   - Deploy no Render (backend)
   - Deploy no Netlify (frontend)
   - Testes em produção

## Tarefas Contínuas (Durante todo o desenvolvimento)

1. Documentação
   - Atualização do README
   - Documentação da API (Swagger)
   - Documentação técnica
   - Guias de usuário

2. Testes
   - Testes unitários
   - Testes de integração
   - Testes end-to-end
   - Testes de usabilidade

3. Segurança
   - Implementação de CORS
   - Validação de inputs
   - Proteção contra ataques comuns
   - Auditoria de segurança

## Dependências Técnicas

### Backend
- NestJS
- PostgreSQL (Supabase)
- JWT para autenticação
- Jest para testes
- Swagger para documentação

### Frontend
- Angular 18
- Tailwind CSS
- NgRx para gerenciamento de estado
- Jasmine/Karma para testes

## Marcos do Projeto

1. MVP (Semana 5)
   - Sistema de autenticação completo
   - CRUD básico de cursos
   - Interface básica do usuário

2. Beta (Semana 8)
   - Blog implementado
   - Sistema de comentários
   - Área do aluno funcional

3. Release Candidate (Semana 9)
   - Todas as funcionalidades implementadas
   - Testes completos
   - Documentação atualizada

4. Produção (Semana 10)
   - Deploy completo
   - Monitoramento configurado
   - Sistema em produção

### Após o deploy, sua API estará disponível em:
[Copyhttps://seu-projeto.onrender.com](https://seu-projeto.onrender.com)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: Adicionando nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Guias de Contribuição

- Siga o padrão de commits convencional
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Mantenha o código limpo e bem documentado

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- A todos os instrutores que contribuem com conteúdo
- Nossa comunidade de alunos pelo feedback constante
- Contribuidores open source que tornam isso possível

---

Feito com ❤️ pela equipe JavaPath
