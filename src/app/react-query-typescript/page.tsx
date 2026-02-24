'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AppLinks from '@/features/app-links/components/app-links';
import { useBooks } from '@/features/books/api/get-books';
import BooksList from '@/features/books/components/books-list';
import { useState } from 'react';

export default function ReactQueryTypescriptPage() {
  const [userInput, setUserInput] = useState('');
  const { data, error, isLoading, isError, refetch } = useBooks({
    input: userInput,
  });

  function resetInput() {
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
            <Field>
              <FieldLabel>Search term</FieldLabel>
              <Input
                type="text"
                placeholder="eg. to kill a mockingbird"
                value={userInput}
                onChange={(event) => {
                  setUserInput(event.target.value);
                }}
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
                disabled={!userInput || isLoading}
                onClick={() => {
                  refetch();
                }}
                variant="default"
              >
                Submit
              </Button>
              <Button
                className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                disabled={!userInput || isLoading}
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

      {isError && (
        <section className="flex justify-center py-5">
          <p className="text-red-500">{error.message}</p>
        </section>
      )}

      {isLoading && (
        <section className="flex items-center justify-center gap-2.5 py-5">
          <Spinner />
          <p className="text-gray-600">Loading...</p>
        </section>
      )}

      {data && <BooksList books={data.docs} />}
    </main>
  );
}
