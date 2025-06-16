// app/api/external-api.ts
import axios from 'axios';

// La URL base de tu backend NestJS
const NESTJS_API_BASE_URL = 'http://localhost:3000/books';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  publicationDate: string; // Recibimos y enviamos como string para el DatePicker
}

export type CreateBookDto = Omit<Book, 'id'>;
export type UpdateBookDto = Partial<CreateBookDto>;

const externalApi = {
  getBooks: async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(NESTJS_API_BASE_URL);
    return response.data;
  },

  getBookById: async (id: number): Promise<Book> => {
    const response = await axios.get<Book>(`${NESTJS_API_BASE_URL}/${id}`);
    return response.data;
  },

  createBook: async (book: CreateBookDto): Promise<Book> => {
    const response = await axios.post<Book>(NESTJS_API_BASE_URL, book);
    return response.data;
  },

  updateBook: async (id: number, book: UpdateBookDto): Promise<Book> => {
    const response = await axios.put<Book>(`${NESTJS_API_BASE_URL}/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await axios.delete<void>(`${NESTJS_API_BASE_URL}/${id}`);
  },
};

export default externalApi;