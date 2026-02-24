'use client';

import { useState } from 'react';
import AppLinks from '@/features/app-links/components/app-links';

const BASE_URL = 'https://openlibrary.org/search.json';

async function getBooks(input) {
  return await fetch(`${BASE_URL}?q=${input}`)
    .then((data) => data.json())
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [books, setBooks] = useState(null);

  async function fetchBooks(input) {
    setBooks(null);
    setLoading(true);

    try {
      const res = await getBooks(input);

      setLoading(false);
      setError(false);
      setErrorMessage('');
      setBooks(res);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.message);
      setBooks(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
      <AppLinks />
      <h1 className="text-4xl font-bold text-gray-800">Search Books</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search for books..."
            className="text-black grow border rounded-md px-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-hidden"
            onClick={() => fetchBooks(userInput)}
          >
            Submit
          </button>
        </div>
        <div className="mt-4">
          {/* display error text */}
          {error ? <p className="text-red-500">{errorMessage}</p> : <></>}

          {/* display loading text */}
          {loading ? (
            <p className="text-gray-600">Fetching results...</p>
          ) : (
            <></>
          )}

          {/* display result */}
          {books ? (
            books.docs.map((book) => (
              <p className="text-gray-700" key={book.key}>
                {book.title}
              </p>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
