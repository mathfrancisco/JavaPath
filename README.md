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
