'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { NewsArticle } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const newsSchema = z.object({
  title: z.string().min(1, 'Гарчиг 1-аас доошгүй тэмдэгттэй байх ёстой.'),
  category: z.string().min(2, 'Ангилал оруулна уу.'),
  excerpt: z.string().min(1, 'Товч агуулга 1-аас доошгүй тэмдэгттэй байх ёстой.'),
  content: z.string().min(2, 'Агуулга 2-ос доошгүй тэмдэгттэй байх ёстой.'),
  image: z.any().optional(),
});

type NewsFormValues = z.infer<typeof newsSchema>;

// Function to generate a URL-friendly slug
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};


export default function NewsFormPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const isNew = id === 'new';

  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<NewsArticle | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      category: '',
      excerpt: '',
      content: '',
      image: undefined,
    }
  });

  useEffect(() => {
    if (!isNew && typeof id === 'string') {
      const fetchArticle = async () => {
        setIsLoading(true);
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as NewsArticle;
          setInitialData(data);
          reset({
            title: data.title,
            category: data.category,
            excerpt: data.excerpt,
            content: data.content,
          });
        } else {
          toast({ variant: 'destructive', title: 'Мэдээ олдсонгүй' });
          router.push('/admin/dashboard/news');
        }
        setIsLoading(false);
      };
      fetchArticle();
    }
  }, [id, isNew, router, reset, toast]);
  
  const onSubmit = async (data: NewsFormValues) => {
    setIsLoading(true);
    try {
      let imageUrl = initialData?.image || '';
      const imageFile = data.image?.[0];

      if (imageFile) {
        const storageRef = ref(storage, `news/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      
      const slug = initialData?.slug || generateSlug(data.title);

      const articleData: Omit<NewsArticle, 'id'> = {
        ...data,
        slug,
        date: new Date().toISOString().split('T')[0], // Set current date
        image: imageUrl,
      };

      if (isNew) {
        await addDoc(collection(db, 'news'), articleData);
        toast({ title: 'Амжилттай!', description: 'Шинэ мэдээг үүсгэлээ.' });
      } else {
        const docRef = doc(db, 'news', id as string);
        await setDoc(docRef, articleData, { merge: true });
        toast({ title: 'Амжилттай!', description: 'Мэдээг шинэчиллээ.' });
      }
      router.push('/admin/dashboard/news');

    } catch (error) {
      console.error("Error saving document: ", error);
      toast({ variant: 'destructive', title: 'Алдаа гарлаа', description: 'Мэдээг хадгалахад алдаа гарлаа.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !isNew) {
      return <div className="flex h-screen items-center justify-center">Уншиж байна...</div>;
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/dashboard/news">
            <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
          </Link>
        </Button>
      </div>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{isNew ? 'Шинэ мэдээ нэмэх' : 'Мэдээ засах'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Гарчиг</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Ангилал</Label>
              <Input id="category" {...register('category')} />
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Товч агуулга</Label>
              <Textarea id="excerpt" {...register('excerpt')} />
              {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Үндсэн агуулга</Label>
              <Textarea id="content" {...register('content')} className="min-h-[200px]" />
              {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Зураг</Label>
              <Input id="image" type="file" {...register('image')} accept="image/*" />
              {initialData?.image && <img src={initialData.image} alt="Current" className="mt-2 h-32 w-auto rounded-md" />}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Хадгалж байна...' : 'Хадгалах'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
