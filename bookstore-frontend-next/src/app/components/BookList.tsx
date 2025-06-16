// app/components/BookList.tsx
"use client"; // Marca este componente como un "Client Component"

import React from 'react';
import { Book } from '../api/external-api'; // Asegúrate de la ruta correcta

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Libros</h2>
      {books.length === 0 ? (
        <p className="text-gray-600">No hay libros registrados. ¡Crea uno!</p>
      ) : (
        <ul className="list-none p-0">
          {books.map((book) => (
            <li
              key={book.id}
              className="flex justify-between items-center bg-white p-4 mb-4 rounded-lg shadow-md border border-gray-200"
            >
              <div>
                <strong className="text-lg text-gray-800">{book.title}</strong> por{' '}
                <span className="text-gray-600">{book.author}</span>
                <p className="text-sm text-gray-500 mt-1">
                  Fecha: {new Date(book.publicationDate).toLocaleDateString()}
                </p>
                {book.description && (
                  <p className="text-xs text-gray-400 mt-1">
                    {book.description.substring(0, 100)}...
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(book)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(book.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;