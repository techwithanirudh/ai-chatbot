import { index, text, vector, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { createTable } from '../utils';

export const embedding = createTable(
  'embedding',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    resourceId: uuid('resourceId')
      .notNull()
      .references(() => resource.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    embedding: vector('embedding', { dimensions: 1536 }).notNull(),
  },
  (table) => ({
    embeddingIndex: index('embeddingIndex').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops'),
    ),
  }),
);

export type Embedding = InferSelectModel<typeof embedding>;

export const resource = createTable('resource', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').notNull().default(sql`now()`),
  updatedAt: timestamp('updatedAt').notNull().default(sql`now()`),
});

export type Resource = InferSelectModel<typeof resource>;
