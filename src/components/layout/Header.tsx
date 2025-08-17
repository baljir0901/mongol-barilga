'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Нүүр' },
  { href: '/projects', label: 'Төслүүд' },
  { href: '/news', label: 'Мэдээ' },
  { href: '/careers', label: 'Карьер' },
  { href: '/contact', label: 'Холбоо барих' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg text-primary">Монгол Барилга</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
             <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/admin/login">Админ</Link>
            </Button>
            <button
              className="md:hidden rounded-md p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block rounded-md p-2 text-base font-medium transition-colors hover:bg-accent/80 hover:text-accent-foreground',
                  pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="outline" asChild>
              <Link href="/admin/login">Админ</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
