// bookstore-frontend-next/src/app/components/BookForm.tsx

'use client'; // Componente de cliente

import React, { useState, useEffect } from 'react';
import externalApi, { Book, CreateBookDto, UpdateBookDto } from '../api/external-api';

interface BookFormProps {
  initialData: Book | null; // Datos del libro si estamos editando
  onSuccess: () => void; // Callback para después de una operación exitosa
}

const BookForm: React.FC<BookFormProps> = ({ initialData, onSuccess }) => {
  const [formData, setFormData] = useState<CreateBookDto | UpdateBookDto>({
    title: '',
    author: '',
    description: '',
    publicationDate: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Carga los datos iniciales si se está editando un libro
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        description: initialData.description,
        publicationDate: initialData.publicationDate.split('T')[0], // Formatear para input type="date"
      });
    } else {
      // Limpiar formulario si no estamos editando o si initialData se vuelve null
      setFormData({
        title: '',
        author: '',
        description: '',
        publicationDate: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (initialData && initialData.id) {
        // Modo Edición (Update)
        await externalApi.updateBook(initialData.id, formData);
        alert('Libro actualizado exitosamente!');
      } else {
        // Modo Creación (Create)
        await externalApi.createBook(formData as CreateBookDto); // Cast para asegurar tipo CreateBookDto
        alert('Libro creado exitosamente!');
      }
      onSuccess(); // Llama a la función de éxito para limpiar formulario y recargar lista
    } catch (err) {
      console.error('Error submitting book:', err);
      setError('Error al guardar el libro. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Autor</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      <div>
        <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700">Fecha de Publicación</label>
        <input
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Guardando...' : (initialData ? 'Actualizar Libro' : 'Crear Libro')}
      </button>
      {initialData && ( // Muestra botón "Cancelar" solo en modo edición
        <button
          type="button"
          onClick={() => onSuccess()} // Llama a onSuccess para limpiar el formulario
          className="w-full mt-2 px-4 py-2 bg-gray-400 text-white font-semibold rounded-md shadow-md hover:bg-gray-500 transition-colors"
        >
          Cancelar Edición
        </button>
      )}
    </form>
  );
};

export default BookForm;