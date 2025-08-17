'use client';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Уншиж байна...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
       <div className="border-b bg-white">
        <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
                <h1 className="text-xl font-bold font-headline text-primary">Админ удирдлага</h1>
                {user && (
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                    <Button onClick={handleLogout} variant="outline" size="sm">
                    Гарах
                    </Button>
                </div>
                )}
            </div>
        </div>
      </div>
      <div className="container mx-auto p-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Үндсэн самбар</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/dashboard/news">
            <Card className="hover:bg-gray-100 hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Мэдээний менежмент</CardTitle>
                <Newspaper className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Мэдээ, нийтлэл үүсгэх, засах, устгах
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
