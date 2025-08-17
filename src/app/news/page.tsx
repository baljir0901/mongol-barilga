
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { NewsArticle } from '@/lib/types';

// Revalidate the page every 60 seconds
export const revalidate = 60;

async function getNewsItems(): Promise<NewsArticle[]> {
  const newsCollection = collection(db, 'news');
  const q = query(newsCollection, orderBy('date', 'desc'));
  const newsSnapshot = await getDocs(q);
  const newsList = newsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as NewsArticle));
  return newsList;
}

export default async function NewsPage() {
  const newsItems = await getNewsItems();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Компанийн Мэдээ</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Бидний үйл ажиллагаа, шинэ төсөл, амжилтын талаарх сүүлийн үеийн мэдээ мэдээлэл.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <Card key={item.id} className="flex flex-col overflow-hidden group">
            <Link href={`/news/${item.slug}`} className="block">
              <div className="relative h-60 w-full">
                <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint || 'news article'} />
              </div>
            </Link>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Badge variant="secondary">{item.category}</Badge>
                <time dateTime={item.date}>{item.date}</time>
              </div>
              <Link href={`/news/${item.slug}`}>
                <CardTitle className="font-headline text-xl leading-snug group-hover:text-primary transition-colors">{item.title}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{item.excerpt}</CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={`/news/${item.slug}`} className="flex items-center text-sm font-semibold text-primary hover:underline">
                Дэлгэрэнгүй унших <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
       {newsItems.length === 0 && (
          <div className="text-center col-span-full border rounded-lg p-12 bg-gray-50 mt-8">
            <p className="text-muted-foreground">Одоогоор нийтлэгдсэн мэдээ байхгүй байна.</p>
          </div>
        )}
    </div>
  );
}
