import { embed, embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { embedding as embeddings } from "@/server/db/schema";
import { db } from "@/server/db";
import { myProvider } from '@/lib/ai/providers';

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: myProvider.textEmbeddingModel("small-model"),
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\n", " ");
  const { embedding } = await embed({
    model: myProvider.textEmbeddingModel("small-model"),
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const k = 10;

  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(embeddings.embedding, userQueryEmbedded)})`;
  const similarGuides = await db
    .select({ name: embeddings.content, similarity })
    .from(embeddings)
    // .where(gt(similarity, 0.3))
    .orderBy((t) => desc(t.similarity))
    .limit(k);

  return similarGuides;
};