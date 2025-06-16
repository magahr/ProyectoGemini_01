// src/app/page.tsx
'use client'; // Esto es necesario para usar hooks de React como useState, useEffect en Next.js App Router

import { useState, useEffect } from 'react';

// Define una interfaz para la estructura de tu libro para TypeScript
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  publicationDate: string; // O Date, dependiendo de cómo lo manejes en el frontend
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Usa la variable de entorno para la URL base del API
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (!API_BASE_URL) {
          throw new Error("NEXT_PUBLIC_API_BASE_URL no está definida en .env.local");
        }
        const response = await fetch(`${API_BASE_URL}/books`);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [API_BASE_URL]); // Vuelve a ejecutar si la URL base cambia

  if (loading) {
    return <div className="text-center p-4">Cargando libros...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Nuestra Biblioteca de Libros</h1>

      {books.length === 0 ? (
        <p>No hay libros disponibles. ¡Crea uno!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">Autor: {book.author}</p>
              <p className="text-gray-700 mt-2">{book.description}</p>
              <p className="text-sm text-gray-500">
                Publicación: {new Date(book.publicationDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Aquí podrías añadir un formulario para crear nuevos libros */}
    </main>
  );
}