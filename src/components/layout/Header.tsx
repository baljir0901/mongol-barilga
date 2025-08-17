'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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
    <header className="absolute top-0 z-50 w-full bg-black/50 text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <div className="text-left">
              <span className="font-bold font-headline text-xl tracking-wider">Монгол Барилга</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-white/80',
                  pathname === link.href ? 'text-white font-semibold' : 'text-white/70'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
        <div className="md:hidden border-t border-white/20 bg-black/80 backdrop-blur-lg">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block rounded-md p-3 text-base font-medium transition-colors hover:bg-white/10',
                   pathname === link.href ? 'bg-white/20 text-white' : 'text-white/80'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
