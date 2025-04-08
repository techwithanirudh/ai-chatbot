import type { InferSelectModel } from 'drizzle-orm';
import {
  varchar,
  timestamp,
  uuid,
  text,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core';
import { relations, } from 'drizzle-orm';
import { createTable } from '../utils';

// users
export const user = createTable('user', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    withTimezone: true,
  }),
  image: varchar('image', { length: 255 }),
});

export const userRelaitons = relations(user, ({ many }) => ({
  accounts: many(account),
}));

export type User = InferSelectModel<typeof user>;

// account
export const account = createTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 })
      .$type<'email' | 'oauth' | 'oidc' | 'webauthn'>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const AccountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export type Account = InferSelectModel<typeof account>;

// session
export const session = createTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
});

export const SessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export type Session = InferSelectModel<typeof session>;

// verificationToken
export const verificationToken = createTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export type VerificationToken = InferSelectModel<typeof verificationToken>;

// authenticator
// export const Authenticator = createTable(
//     "authenticator",
//     {
//         credentialID: text("credentialID").notNull().unique(),
//         userId: uuid("userId")
//             .notNull()
//             .references(() => user.id, { onDelete: "cascade" }),
//         providerAccountId: text("providerAccountId").notNull(),
//         credentialPublicKey: text("credentialPublicKey").notNull(),
//         counter: integer("counter").notNull(),
//         credentialDeviceType: text("credentialDeviceType").notNull(),
//         credentialBackedUp: boolean("credentialBackedUp").notNull(),
//         transports: text("transports"),
//     },
//     (authenticator) => ({
//         compositePK: primaryKey({
//             columns: [authenticator.userId, authenticator.credentialID],
//         }),
//     })
// )