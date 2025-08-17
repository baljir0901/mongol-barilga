import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { NewsArticle } from '@/lib/types';
import { notFound } from 'next/navigation';

// Revalidate the page every 60 seconds
export const revalidate = 60;

async function getNewsItems() {
  const newsCollection = collection(db, 'news');
  const newsSnapshot = await getDocs(newsCollection);
  return newsSnapshot.docs.map(doc => doc.data() as NewsArticle);
}

export async function generateStaticParams() {
  const newsItems = await getNewsItems();
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

async function getNewsItem(slug: string): Promise<NewsArticle | null> {
  const newsCollection = collection(db, 'news');
  const q = query(newsCollection, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }
  
  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as NewsArticle;
}

export default async function NewsArticlePage({ params }: { params: { slug:string } }) {
  const article = await getNewsItem(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
       <Link href="/news" className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-8">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Бүх мэдээ рүү буцах
      </Link>
      
      <header className="mb-8">
        <Badge variant="secondary" className="mb-2">{article.category}</Badge>
        <h1 className="text-3xl md:text-5xl font-bold font-headline text-primary leading-tight">{article.title}</h1>
        <p className="mt-4 text-muted-foreground">Нийтлэгдсэн: <time dateTime={article.date}>{article.date}</time></p>
      </header>
      
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
        <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" data-ai-hint={article.aiHint || 'news article'} />
      </div>
      
      <div 
        className="prose prose-lg max-w-none text-foreground prose-p:text-foreground/80 prose-headings:text-primary prose-headings:font-headline"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
    </article>
  );
}
