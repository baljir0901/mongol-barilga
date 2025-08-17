'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "@/lib/firebase";

const formSchema = z.object({
  name: z.string().min(2, { message: "Нэрээ оруулна уу." }),
  email: z.string().email({ message: "Зөв и-мэйл хаяг оруулна уу." }),
  subject: z.string().min(5, { message: "Гарчиг дор хаяж 5 тэмдэгттэй байх ёстой." }),
  message: z.string().min(10, { message: "Зурвас дор хаяж 10 тэмдэгттэй байх ёстой." }),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Add a new document with a generated id to the "mail" collection
      await addDoc(collection(db, "mail"), {
        to: ['baljir0901@gmail.com'],
        message: {
          subject: `Шинэ санал хүсэлт: ${values.subject}`,
          html: `
            <p><strong>Нэр:</strong> ${values.name}</p>
            <p><strong>И-мэйл:</strong> ${values.email}</p>
            <hr />
            <p><strong>Зурвас:</strong></p>
            <p>${values.message}</p>
          `,
        },
      });

      toast({
        title: "Амжилттай илгээлээ",
        description: "Таны санал хүсэлтийг хүлээн авлаа. Бид тантай удахгүй холбогдох болно.",
      });
      form.reset();
    } catch (error) {
      console.error("Error sending email: ", error);
      toast({
        variant: "destructive",
        title: "Алдаа гарлаа",
        description: "Санал хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Таны нэр</FormLabel>
              <FormControl>
                <Input placeholder="Нэр" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>И-мэйл хаяг</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Гарчиг</FormLabel>
              <FormControl>
                <Input placeholder="Санал хүсэлт" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Зурвас</FormLabel>
              <FormControl>
                <Textarea placeholder="Энд зурвасаа бичнэ үү..." className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Илгээж байна...' : 'Илгээх'}
        </Button>
      </form>
    </Form>
  );
}
