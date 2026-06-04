import { healthArticles } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ArticlePageClient from './ArticlePageClient';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = healthArticles.find(a => a.slug === slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | Narayana Health`,
    description: article.snippet,
    openGraph: { title: article.title, description: article.snippet, type: 'article' },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = healthArticles.find(a => a.slug === slug);
  if (!article) notFound();
  return <ArticlePageClient article={article!} />;
}
