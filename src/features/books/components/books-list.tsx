import { Doc } from '@/types/api';
import Book from './book';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function BooksList(props: { books: Doc[] }) {
  return (
    <section className="mt-8">
      {props.books.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Title (first published)</TableHead>
              <TableHead>First Author</TableHead>
              <TableHead className="text-right">Language(s)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.books.map((book) => (
              <Book book={book} key={book.key} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center py-5">
          <p className="text-gray-600">
            No results found. Try searching again.
          </p>
        </div>
      )}
    </section>
  );
}
