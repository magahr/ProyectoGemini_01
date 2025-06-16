// app/components/BookForm.tsx
"use client"; // Marca este componente como un "Client Component" en Next.js App Router

import React, { useState, useEffect } from 'react';
import { CreateBookDto, Book } from '../api/external-api'; // Asegúrate de la ruta correcta

interface BookFormProps {
  initialData?: Book; // Datos iniciales para edición
  onSubmit: (book: CreateBookDto) => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateBookDto>({
    title: '',
    author: '',
    description: '',
    publicationDate: '',
  });

  useEffect(() => {
    if (initialData) {
      const formattedDate = initialData.publicationDate
        ? new Date(initialData.publicationDate).toISOString().split('T')[0]
        : '';
      setFormData({
        title: initialData.title,
        author: initialData.author,
        description: initialData.description,
        publicationDate: formattedDate,
      });
    } else {
      setFormData({
        title: '',
        author: '',
        description: '',
        publicationDate: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">{initialData ? 'Editar Libro' : 'Crear Nuevo Libro'}</h3>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="block">
          <span className="text-gray-700">Título:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Autor:</span>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Descripción:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </label>
        <label className="block">
          <span className="text-gray-700">Fecha de Publicación:</span>
          <input
            type="date"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {initialData ? 'Guardar Cambios' : 'Crear Libro'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;