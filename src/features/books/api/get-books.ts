import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { type BooksSuccessResponse } from '@/types/api';

const BASE_URL = 'https://openlibrary.org/search.json';

export async function getBooks(input: string): Promise<BooksSuccessResponse> {
  const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(input)}`);

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  const data: BooksSuccessResponse = await response.json();
  return data;
}

export const getBooksQueryOptions = (input: string) => {
  return queryOptions({
    queryKey: ['books', input],
    queryFn: () => getBooks(input),
  });
};

type UseBooksOptions = {
  input: string;
  queryConfig?: QueryConfig<typeof getBooksQueryOptions>;
};

export const useBooks = ({ input, queryConfig }: UseBooksOptions) => {
  return useQuery({
    enabled: false,
    ...getBooksQueryOptions(input),
    ...queryConfig,
  });
};
