// bookstore-frontend-next/src/app/components/BookList.tsx

'use client';

import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'; // <--- Añadir forwardRef y useImperativeHandle
import externalApi, { Book } from '../api/external-api';

interface BookListProps {
  onEdit: (book: Book) => void;
  onDeleteSuccess: () => void;
}

// Definir la interfaz para los métodos que expondremos a través del ref
export interface BookListRef {
  fetchBooks: () => Promise<void>;
}

// Envolver el componente con forwardRef
// eslint-disable-next-line react/display-name
const BookList = forwardRef<BookListRef, BookListProps>(
  ({ onEdit, onDeleteSuccess }, ref) => { // <--- 'ref' se pasa como segundo argumento
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await externalApi.getBooks();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // <--- Usar useImperativeHandle para exponer fetchBooks a través del ref
    useImperativeHandle(ref, () => ({
      fetchBooks, // Exponemos la función fetchBooks
    }));

    // Carga los libros cuando el componente se monta (y también puede ser llamado desde el ref)
    useEffect(() => {
      fetchBooks();
    }, []);

    const handleDelete = async (id: number) => {
      if (window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
        try {
          await externalApi.deleteBook(id);
          alert('Libro eliminado exitosamente!');
          onDeleteSuccess();
        } catch (err) {
          console.error('Error deleting book:', err);
          alert('Error al eliminar el libro.');
        }
      }
    };

    if (loading) {
      return <p>Cargando libros...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (books.length === 0) {
      return <p>No hay libros disponibles. ¡Crea uno!</p>;
    }

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Libros Disponibles</h2>
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-700">Autor: {book.author}</p>
                <p className="text-gray-600 text-sm">{book.description}</p>
                <p className="text-gray-500 text-xs">Publicado: {new Date(book.publicationDate).toLocaleDateString()}</p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-2">
                <button
                  onClick={() => onEdit(book)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default BookList;