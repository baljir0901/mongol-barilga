import { ContactForm } from '@/components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Холбоо барих</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Танд асуух зүйл байна уу? Бидэнтэй доорх мэдээллийн дагуу холбогдоорой.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">Санал хүсэлт илгээх</h2>
          <ContactForm />
        </div>
        <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold font-headline text-primary mb-4">Бидний мэдээлэл</h3>
              <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Хаяг</p>
                        <p>Монгол улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Чингисийн өргөн чөлөө, Шинэ-Оффис цамхаг, 12 давхарт</p>
                      </div>
                  </div>
                   <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Утас</p>
                        <p>+976 7777-8888</p>
                      </div>
                  </div>
                   <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">И-мэйл</p>
                        <p>contact@mongolbarilga.mn</p>
                      </div>
                  </div>
              </div>
            </div>
             <div>
              <h3 className="text-xl font-bold font-headline text-primary mb-4">Байршил</h3>
               <div className="aspect-video rounded-lg overflow-hidden border">
                <Image src="https://placehold.co/800x450.png" alt="Map location" width={800} height={450} className="w-full h-full object-cover" data-ai-hint="city map" />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
