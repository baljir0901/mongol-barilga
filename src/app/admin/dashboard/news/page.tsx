'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { NewsArticle } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';


export default function NewsManagementPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchNews = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'news'));
    const newsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
    setNews(newsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'news', id));
      toast({
        title: "Амжилттай устгалаа",
        description: "Мэдээг амжилттай устгалаа.",
      });
      fetchNews(); // Refresh the list
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Алдаа гарлаа",
        description: "Мэдээг устгахад алдаа гарлаа.",
      });
    }
  };


  if (loading) {
    return <div className="flex h-screen items-center justify-center">Мэдээг уншиж байна...</div>;
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Мэдээний менежмент</h1>
          <p className="text-muted-foreground">Нийт {news.length} мэдээ байна.</p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard/news/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Шинэ мэдээ нэмэх
          </Link>
        </Button>
      </div>
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Гарчиг</TableHead>
              <TableHead>Ангилал</TableHead>
              <TableHead>Огноо</TableHead>
              <TableHead className="text-right">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/dashboard/news/${article.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Та итгэлтэй байна уу?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Энэ үйлдлийг буцаах боломжгүй. Энэ нь мэдээг бүрмөсөн устгах болно.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Цуцлах</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(article.id!)}>Устгах</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
       {news.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
              Одоогоор мэдээ байхгүй байна.
          </div>
      )}
    </div>
  );
}
