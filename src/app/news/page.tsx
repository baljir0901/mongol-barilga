import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const newsItems = [
  {
    slug: 'shine-tosol-ekhluulle',
    title: 'Бид шинэ төсөл эхлүүллээ',
    date: '2024-07-15',
    category: 'Төсөл',
    excerpt: 'Манай компани "Ногоон хотхон" нэртэй шинэ орон сууцны төслийг эхлүүлж байгааг дуулгахад таатай байна. Энэхүү төсөл нь байгальд ээлтэй...',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'construction blueprint',
  },
  {
    slug: 'chнарын-шагнал-хуртев',
    title: 'Чанарын шагнал хүртэв',
    date: '2024-06-28',
    category: 'Нэр хүнд',
    excerpt: 'Монголын Барилгын Үндэсний Ассоциациас зохион байгуулсан "Оны шилдэг барилга" шалгаруулалтаас манай "Шинэ-Оффис цамхаг" төсөл...',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'award trophy',
  },
  {
    slug: 'shine-технологи-nevtruullee',
    title: 'Шинэ технологи нэвтрүүллээ',
    date: '2024-05-10',
    category: 'Технологи',
    excerpt: 'Барилгын үр ашгийг нэмэгдүүлэх зорилгоор бид Герман улсын дэвшилтэт технологи болох модуляр барилгын системийг үйл ажиллагаандаа нэвтрүүллээ.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'modern technology',
  },
];

export default function NewsPage() {
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
          <Card key={item.slug} className="flex flex-col overflow-hidden group">
            <Link href={`/news/${item.slug}`} className="block">
              <div className="relative h-60 w-full">
                <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
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
    </div>
  );
}
