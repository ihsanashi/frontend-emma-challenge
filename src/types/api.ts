// generated with https://app.quicktype.io/

import * as z from 'zod';

export const EbookAccessSchema = z.enum([
  'borrowable',
  'no_ebook',
  'printdisabled',
  'public',
]);
export type EbookAccess = z.infer<typeof EbookAccessSchema>;

export const DocSchema = z.object({
  author_key: z.array(z.string()).optional(),
  author_name: z.array(z.string()).optional(),
  cover_edition_key: z.string().optional(),
  cover_i: z.number().optional(),
  ebook_access: EbookAccessSchema,
  edition_count: z.number(),
  first_publish_year: z.number().optional(),
  has_fulltext: z.boolean(),
  ia: z.array(z.string()).optional(),
  ia_collection: z.array(z.string()).optional(),
  key: z.string(),
  language: z.array(z.string()).optional(),
  lending_edition_s: z.string().optional(),
  lending_identifier_s: z.string().optional(),
  public_scan_b: z.boolean(),
  title: z.string(),
  subtitle: z.string().optional(),
  id_standard_ebooks: z.array(z.string()).optional(),
  id_librivox: z.array(z.string()).optional(),
  id_project_gutenberg: z.array(z.string()).optional(),
});
export type Doc = z.infer<typeof DocSchema>;

export const BooksSuccessResponseSchema = z.object({
  numFound: z.number(),
  start: z.number(),
  numFoundExact: z.boolean(),
  num_found: z.number(),
  documentation_url: z.string(),
  q: z.string(),
  offset: z.null(),
  docs: z.array(DocSchema),
});

export type BooksSuccessResponse = z.infer<typeof BooksSuccessResponseSchema>;
