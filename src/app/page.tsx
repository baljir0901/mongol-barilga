import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HardHat, ClipboardList, Wrench, Building } from 'lucide-react';

const services = [
  {
    icon: <ClipboardList className="w-12 h-12 text-primary" />,
    title: 'Зураг төсөл, төлөвлөлт',
    description: 'Орчин үеийн шийдэл бүхий барилгын зураг төслийг боловсруулна.',
  },
  {
    icon: <HardHat className="w-12 h-12 text-primary" />,
    title: 'Барилга угсралт',
    description: 'Чанарын өндөр түвшинд, батлагдсан технологиор барилга угсралтын ажлыг гүйцэтгэнэ.',
  },
  {
    icon: <Wrench className="w-12 h-12 text-primary" />,
    title: 'Засвар, шинэчлэлт',
    description: 'Барилгын дотор болон гадна засварын ажлыг мэргэжлийн түвшинд хийнэ.',
  },
  {
    icon: <Building className="w-12 h-12 text-primary" />,
    title: 'Хөрөнгийн менежмент',
    description: 'Үл хөдлөх хөрөнгийн менежмент, зөвлөгөө өгөх үйлчилгээ.',
  },
];

const projects = [
  {
    name: 'Хан-Уул хотхон',
    description: 'Улаанбаатар хотын А зэрэглэлийн бүсэд байрлах 200 айлын орон сууц.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'modern apartment',
  },
  {
    name: 'Шинэ-Оффис цамхаг',
    description: 'Хотын төвд байрлах орчин үеийн оффисын барилга.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'office building',
  },
  {
    name: 'Нарны хороолол',
    description: 'Гэр бүлд ээлтэй, ногоон байгууламж бүхий таун хаус хороолол.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'suburban houses',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')" }} data-ai-hint="construction site">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg leading-tight max-w-4xl">ТЭНГЭРТ ТЭТГЭГДЭЖ, ГАЗАРТ ГАГНАГДСАН ИХ БҮТЭЭН БАЙГУУЛАГЧ</h1>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Бидний Үйлчилгээ</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Чанартай, найдвартай, иж бүрэн барилгын үйлчилгээг санал болгож байна.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="font-headline">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Онцлох Төслүүд</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Бидний гүйцэтгэсэн амжилттай төслүүдээс.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.name} className="overflow-hidden group">
                <div className="relative h-60">
                  <Image src={project.image} alt={project.name} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" data-ai-hint={project.aiHint} />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/projects">Бүх төсөл харах</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-20 text-center">
          <h2 className="text-3xl font-bold font-headline">Төсөл хэрэгжүүлэхэд бэлэн үү?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">Бидэнтэй холбогдож, таны дараагийн төслийн талаар ярилцацгаая.</p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Үнийн санал авах</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
