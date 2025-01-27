import { Post } from '../../../services/blog.service';
import { BlogPost } from '../../../components/card-blog/card-blog.component';

export function adaptPostToBlogPost(post: Post): BlogPost {
  return {
    id: +post.id, // Converte id para number
    title: post.title,
    imageUrl: '', // Adicione lógica para definir a URL da imagem, se necessário
    date: post.createdAt,
    author: post.author.name,
    authorAvatar: post.author.avatar || '',
    excerpt: post.content.substring(0, 100), // Exemplo: pega os primeiros 100 caracteres
    content: post.content,
    readTime: Math.ceil(post.content.split(' ').length / 200), // Exemplo: calcula tempo de leitura
    category: post.tags?.[0] || 'Geral', // Usa a primeira tag como categoria ou 'Geral'
     // Garante que tags seja um array vazio se não existir

  };
}
