export interface NewsArticle {
  id?: string; // Firestore document ID
  slug: string;
  title: string;
  date: string; // ISO 8601 format
  category: string;
  excerpt: string;
  image: string; // URL to the image in Firebase Storage
  aiHint?: string;
  content: string; // HTML content
}
