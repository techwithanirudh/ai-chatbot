import { pgTableCreator } from 'drizzle-orm/pg-core';

/**
 * Factory function that creates tables with a consistent prefix
 * to avoid naming conflicts in the database.
 */
export const createTable = pgTableCreator((name) => `ai-chatbot_${name}`);
