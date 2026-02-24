'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { TError } from '@/types/error';
import { BooksSuccessResponse } from '@/types/api';
import { getBooks } from '@/features/books/api/get-books';
import BooksList from '@/features/books/components/books-list';
import AppLinks from '@/features/app-links/components/app-links';

export default function VanillaTypescriptPage() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TError>({ isError: false, message: '' });
  const [books, setBooks] = useState<BooksSuccessResponse | null>(null);

  async function fetchBooks(input: string) {
    setBooks(null);
    setLoading(true);
    setError({ isError: false, message: '' });

    try {
      const res = await getBooks(input);

      setLoading(false);
      setError({
        isError: false,
        message: '',
      });
      setBooks(res);
    } catch (error) {
      setLoading(false);
      setBooks(null);
      if (
        typeof error === 'object' &&
        error &&
        'message' in error &&
        typeof error.message === 'string'
      ) {
        setError({
          isError: true,
          message: error.message as string,
        });
      }
    }
  }

  function resetInput() {
    setBooks(null);
    setUserInput('');
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 p-8 space-y-4">
      <section className="flex flex-col items-center justify-start gap-4">
        <AppLinks />
        <h1 className="text-4xl font-bold text-gray-800">Search Books</h1>
        <Card className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>Find your favourites</CardTitle>
          </CardHeader>
          <CardContent>
            <Field data-invalid>
              <FieldLabel>Search term</FieldLabel>
              <Input
                type="text"
                placeholder="eg. to kill a mockingbird"
                value={userInput}
                onChange={(event) => {
                  setUserInput(event.target.value);
                }}
                aria-invalid={userInput.length < 3}
                onInvalid={() => <p>Test</p>}
              />
              <FieldDescription>
                Matched results will be displayed below
              </FieldDescription>
            </Field>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col w-full gap-4">
              <Button
                className="grow bg-blue-500 text-white hover:bg-blue-600"
                variant="default"
                disabled={!userInput || loading}
                onClick={() => fetchBooks(userInput)}
              >
                Submit
              </Button>
              <Button
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                disabled={!userInput || loading}
                onClick={() => {
                  resetInput();
                }}
                variant="destructive"
              >
                Reset
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>

      {error.isError ? (
        <section className="flex justify-center py-5">
          <p className="text-red-500">{error.message}</p>
        </section>
      ) : null}

      {loading ? (
        <section className="flex items-center justify-center gap-2.5 py-5">
          <Spinner />
          <p className="text-gray-600">Loading...</p>
        </section>
      ) : null}

      {books && <BooksList books={books.docs} />}
    </main>
  );
}
