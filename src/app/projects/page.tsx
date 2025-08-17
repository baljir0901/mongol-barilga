import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const projects = [
  {
    title: 'Хан-Уул хотхон',
    category: 'Орон сууц',
    description: 'Улаанбаатар хотын А зэрэглэлийн бүсэд байрлах 200 айлын орон сууц.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'modern apartment',
  },
  {
    title: 'Шинэ-Оффис цамхаг',
    category: 'Оффис',
    description: 'Хотын төвд байрлах орчин үеийн оффисын барилга.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'office building',
  },
  {
    title: 'Нарны хороолол',
    category: 'Хаус хороолол',
    description: 'Гэр бүлд ээлтэй, ногоон байгууламж бүхий таун хаус хороолол.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'suburban houses',
  },
  {
    title: 'Эко-Аж үйлдвэрийн парк',
    category: 'Үйлдвэр',
    description: 'Байгальд ээлтэй технологиор баригдсан аж үйлдвэрийн цогцолбор.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'industrial park',
  },
  {
    title: 'Голден Бридж',
    category: 'Гүүр',
    description: 'Хотын замын түгжрэлийг бууруулах зорилготой гүүрэн байгууламж.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'modern bridge',
  },
  {
    title: 'Худалдааны төв',
    category: 'Худалдаа, үйлчилгээ',
    description: 'Олон улсын стандартад нийцсэн худалдаа үйлчилгээний төв.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'shopping mall',
  },
];

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Бидний Төслүүд</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Бид орон сууц, оффис, үйлдвэр, дэд бүтэц зэрэг олон төрлийн төслүүдийг амжилттай хэрэгжүүлсэн туршлагатай.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.title} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-64 w-full">
              <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint={project.aiHint} />
            </div>
            <CardHeader>
              <p className="text-sm text-primary font-semibold">{project.category}</p>
              <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
