// bookstore-frontend-next/src/app/page.tsx

'use client';

import React, { useState, useRef } from 'react';
import BookForm from './components/BookForm';
import BookList, { BookListRef } from './components/BookList'; // <--- Importa BookListRef
import { Book } from './api/external-api';

export default function Home() {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  // <--- Ajustar el tipo de useRef para que apunte a BookListRef
  const bookListRef = useRef<BookListRef | null>(null); 

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleSuccess = () => {
    setEditingBook(null);
    if (bookListRef.current) {
      bookListRef.current.fetchBooks(); // Esto ahora debería funcionar
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-24 bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-800">
        Gestión de Librería
      </h1>

      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingBook ? 'Editar Libro' : 'Añadir Nuevo Libro'}
        </h2>
        <BookForm
          initialData={editingBook}
          onSuccess={handleSuccess}
        />
      </div>

      <div className="w-full max-w-2xl">
        <BookList
          ref={bookListRef} // Aquí el 'ref' ya no debería dar error de TypeScript
          onEdit={handleEditBook}
          onDeleteSuccess={handleSuccess}
        />
      </div>
    </main>
  );
}