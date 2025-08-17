import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from 'lucide-react';

const jobOpenings = [
  {
    id: "eng01",
    title: "Барилгын инженер",
    location: "Улаанбаатар",
    type: "Бүтэн цаг",
    description: "Барилгын төслийн явцыг удирдан зохион байгуулах, техникийн хяналт тавих, зураг төсөлтэй ажиллах өндөр ур чадвартай инженер ажилд авна.",
    requirements: [
      "Барилгын инженерийн чиглэлээр их дээд сургууль төгссөн",
      "Мэргэжлээрээ 3-аас доошгүй жил ажилласан туршлагатай",
      "AutoCAD, MS Project програмууд дээр ажиллах чадвартай",
      "Багаар ажиллах болон удирдан зохион байгуулах чадвартай",
    ],
  },
  {
    id: "arc01",
    title: "Архитектор",
    location: "Улаанбаатар",
    type: "Бүтэн цаг",
    description: "Барилгын эх загвар, зураг төсөл боловсруулах, 3D загварчлал хийх бүтээлч сэтгэлгээтэй архитектор хайж байна.",
    requirements: [
      "Архитекторын чиглэлээр бакалавр болон түүнээс дээш зэрэгтэй",
      "Archicad, Revit, Lumion програмуудыг эзэмшсэн",
      "Барилгын норм, дүрэм, стандартын мэдлэгтэй",
      "Англи хэлний дундаас дээш түвшний мэдлэгтэй бол давуу тал болно",
    ],
  },
  {
    id: "sal01",
    title: "Борлуулалтын менежер",
    location: "Улаанбаатар",
    type: "Бүтэн цаг",
    description: "Компанийн үл хөдлөх хөрөнгийн борлуулалтыг хариуцан ажиллах, харилцагчидтай харилцаа холбоо тогтоох, борлуулалтын төлөвлөгөө боловсруулах ур чадвартай менежер ажилд авна.",
    requirements: [
      "Бизнесийн удирдлага, маркетингийн чиглэлээр их дээд сургууль төгссөн",
      "Борлуулалтын чиглэлээр 2-оос доошгүй жил ажилласан туршлагатай",
      "Харилцааны өндөр ур чадвартай, үнэмшүүлэх ятгах чадвартай",
      "Үр дүнд суурилсан, идэвх санаачилгатай",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Карьер</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Манай чадварлаг, эрч хүчтэй хамт олонд нэгдэж, хамтдаа хөгжин, бүтээн байгуулалтад оролцохыг урьж байна.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold font-headline text-primary mb-6">Нээлттэй ажлын байрууд</h2>
        {jobOpenings.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {jobOpenings.map((job) => (
              <AccordionItem key={job.id} value={job.id}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="w-full">
                    <h3 className="text-xl font-headline font-semibold">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-background/50 rounded-b-md">
                  <p className="mb-4">{job.description}</p>
                  <h4 className="font-semibold mb-2">Тавигдах шаардлага:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">Анкет илгээх</Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center border rounded-lg p-12 bg-gray-50">
            <p className="text-muted-foreground">Одоогоор нээлттэй ажлын байр байхгүй байна. Сонирхсон хэвээр байвал бидэнтэй холбогдоорой.</p>
          </div>
        )}
      </div>
    </div>
  );
}
