import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft } from 'lucide-react';

const newsItems = [
  {
    slug: 'shine-tosol-ekhluulle',
    title: 'Бид шинэ төсөл эхлүүллээ',
    date: '2024-07-15',
    category: 'Төсөл',
    excerpt: 'Манай компани "Ногоон хотхон" нэртэй шинэ орон сууцны төслийг эхлүүлж байгааг дуулгахад таатай байна. Энэхүү төсөл нь байгальд ээлтэй...',
    image: 'https://placehold.co/1200x600.png',
    aiHint: 'construction blueprint',
    content: `
      <p>Манай компани "Ногоон хотхон" нэртэй шинэ орон сууцны төслийг эхлүүлж байгааг дуулгахад таатай байна. Энэхүү төсөл нь байгальд ээлтэй, орчин үеийн технологид суурилсан бөгөөд нийт 500 айлын орон сууц, үйлчилгээний төв, ногоон байгууламжаас бүрдэнэ.</p>
      <p>Төслийн гол онцлог нь сэргээгдэх эрчим хүчний эх үүсвэрийг ашиглаж, оршин суугчдын тав тухтай, эрүүл орчинд амьдрах нөхцөлийг бүрдүүлэхэд оршино. Бид энэхүү төслөөрөө Улаанбаатар хотын орон сууцны шинэ стандартыг тогтоохыг зорьж байна.</p>
    `,
  },
  {
    slug: 'chнарын-шагнал-хуртев',
    title: 'Чанарын шагнал хүртэв',
    date: '2024-06-28',
    category: 'Нэр хүнд',
    excerpt: 'Монголын Барилгын Үндэсний Ассоциациас зохион байгуулсан "Оны шилдэг барилга" шалгаруулалтаас манай "Шинэ-Оффис цамхаг" төсөл...',
    image: 'https://placehold.co/1200x600.png',
    aiHint: 'award trophy',
    content: `
      <p>Монголын Барилгын Үндэсний Ассоциациас жил бүр зохион байгуулдаг "Оны шилдэг барилга" шалгаруулалтаас манай "Шинэ-Оффис цамхаг" төсөл "Шилдэг оффисын барилга" төрөлд тэргүүн байр эзэллээ. Энэхүү шагнал нь манай хамт олны хичээл зүтгэл, чанарыг эрхэмлэдэг зарчмын үр дүн юм.</p>
      <p>Биднийг дэмжиж, итгэл хүлээлгэсэн нийт харилцагчиддаа талархал илэрхийлье.</p>
    `,
  },
  {
    slug: 'shine-технологи-nevtruullee',
    title: 'Шинэ технологи нэвтрүүллээ',
    date: '2024-05-10',
    category: 'Технологи',
    excerpt: 'Барилгын үр ашгийг нэмэгдүүлэх зорилгоор бид Герман улсын дэвшилтэт технологи болох модуляр барилгын системийг үйл ажиллагаандаа нэвтрүүллээ.',
    image: 'https://placehold.co/1200x600.png',
    aiHint: 'modern technology',
    content: `
      <p>Барилгын үр ашгийг нэмэгдүүлэх, хугацааг богиносгох зорилгоор бид Герман улсын дэвшилтэт технологи болох модуляр барилгын системийг үйл ажиллагаандаа нэвтрүүллээ. Энэхүү технологи нь барилгын үндсэн хийцийг үйлдвэрт урьдчилан бэлтгэж, барилгын талбайд угсардаг тул цаг хугацаа, зардлыг хэмнэхээс гадна чанарын өндөр хяналтыг хангах боломжийг олгодог.</p>
      <p>Бид шинэ технологийг ашиглан илүү хурдан, илүү чанартай үйлчилгээг хэрэглэгчиддээ хүргэх болно.</p>
    `,
  },
];

export async function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

function getNewsItem(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}


export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = getNewsItem(params.slug);

  if (!article) {
    return <div>Мэдээ олдсонгүй.</div>;
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
        <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" data-ai-hint={article.aiHint} />
      </div>
      
      <div 
        className="prose prose-lg max-w-none text-foreground prose-p:text-foreground/80 prose-headings:text-primary prose-headings:font-headline"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
    </article>
  );
}
