// app/api/external-api.ts
import axios from 'axios';

// La URL base de tu backend NestJS
// ¡CORREGIDO! Ahora solo es la base de la API, sin el endpoint /books
const NESTJS_API_BASE_URL = 'http://localhost:3000'; 

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
    // Ahora llama a http://localhost:3000/books
    const response = await axios.get<Book[]>(`${NESTJS_API_BASE_URL}/books`); 
    return response.data;
  },

  getBookById: async (id: number): Promise<Book> => {
    // Ahora llama a http://localhost:3000/books/:id
    const response = await axios.get<Book>(`${NESTJS_API_BASE_URL}/books/${id}`); 
    return response.data;
  },

  createBook: async (book: CreateBookDto): Promise<Book> => {
    // Ahora llama a http://localhost:3000/books
    const response = await axios.post<Book>(`${NESTJS_API_BASE_URL}/books`, book); 
    return response.data;
  },

  updateBook: async (id: number, book: UpdateBookDto): Promise<Book> => {
    // Ahora llama a http://localhost:3000/books/:id
    const response = await axios.put<Book>(`${NESTJS_API_BASE_URL}/books/${id}`, book); 
    return response.data;
  },

  deleteBook: async (id: number): Promise<void> => {
    // Ahora llama a http://localhost:3000/books/:id
    await axios.delete<void>(`${NESTJS_API_BASE_URL}/books/${id}`); 
  },
};

export default externalApi;