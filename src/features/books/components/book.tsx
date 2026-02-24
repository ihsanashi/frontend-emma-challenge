import { Badge } from '@/components/ui/badge';
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
import { Doc } from '@/types/api';

function LanguageBadge(props: Pick<Doc, 'language'>) {
  const MAX_LANGUAGE_TO_SHOW = 2;

  if (props.language) {
    return (
      <>
        <div className="flex flex-nowrap items-center gap-2">
          {props.language.slice(0, MAX_LANGUAGE_TO_SHOW).map((lang) => (
            <Badge key={lang}>{lang.toLocaleUpperCase()}</Badge>
          ))}
          {props.language.length > MAX_LANGUAGE_TO_SHOW ? (
            <small>+{props.language.length - MAX_LANGUAGE_TO_SHOW}</small>
          ) : null}
        </div>
      </>
    );
  }

  return '';
}

export default function Book(props: { book: Doc }) {
  return (
    <TableRow>
      <TableCell>
        {props.book.title}{' '}
        {props.book.first_publish_year
          ? `(${props.book.first_publish_year})`
          : ''}
      </TableCell>
      <TableCell>
        {props.book.author_name ? props.book.author_name[0] : ''}
      </TableCell>
      <TableCell>
        <LanguageBadge language={props.book.language} />
      </TableCell>
    </TableRow>
    // <div className="flex flex-col py-2">
    //   <h2 className="text-xl font-bold text-left">{props.book.title}</h2>
    //   <p>{props.book.first_publish_year}</p>
    // </div>
  );
}
