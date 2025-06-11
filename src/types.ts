export  interface User {
  id: string;
  username: string;
  isAuthenticated: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  categoryId: string;
  image: string;
  publishYear: number;
  pages: number;
  rating: number;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AppState {
  auth: {
    user: User | null;
    loading: boolean;
    error: string | null;
  };
  categories: {
    list: Category[];
    loading: boolean;
    error: string | null;
  };
  books: {
    list: Book[];
    loading: boolean;
    error: string | null;
  };
  reviews: {
    list: Review[];
    loading: boolean;
    error: string | null;
  };
}
 