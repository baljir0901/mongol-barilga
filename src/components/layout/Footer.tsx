import Link from 'next/link';
import { Building2, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-7 w-7" />
              <span className="font-bold font-headline text-xl">Монгол Барилга</span>
            </Link>
            <p className="text-sm opacity-80">
              Чанар, итгэлийг эрхэмлэн, ирээдүйг бүтээнэ.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Холбоосууд</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/projects" className="hover:opacity-100">Төслүүд</Link></li>
              <li><Link href="/news" className="hover:opacity-100">Мэдээ</Link></li>
              <li><Link href="/careers" className="hover:opacity-100">Карьер</Link></li>
              <li><Link href="/contact" className="hover:opacity-100">Холбоо барих</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Холбоо барих</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Утас: +976 7777-8888</li>
              <li>И-мэйл: contact@mongolbarilga.mn</li>
              <li>Хаяг: Улаанбаатар, Сүхбаатар дүүрэг, 1-р хороо</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 font-headline">Биднийг дагаарай</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="opacity-80 hover:opacity-100"><Facebook /></a>
              <a href="#" aria-label="Twitter" className="opacity-80 hover:opacity-100"><Twitter /></a>
              <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} Монгол Барилга ХХК. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
