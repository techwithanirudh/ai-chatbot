import { type Resource, resource as resourceTable } from '@/server/db/schema';
import { generateEmbeddings } from '@/lib/ai/embedding';
import { db } from '@/server/db';
import { embedding as embeddingTable } from '@/server/db/schema';
import fg from 'fast-glob';
import fs from 'node:fs/promises';
import matter from 'gray-matter';

const createResource = async (input: Omit<Resource, 'id'>) => {
  try {
    const [resource] = await db.insert(resourceTable).values(input).returning();

    const embeddings = await generateEmbeddings(input.content);
    await db.insert(embeddingTable).values(
      embeddings.map((embedding) => ({
        resourceId: resource.id,
        ...embedding,
      })),
    );
    return 'Resource successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};

export async function ingestContent() {
  const files = await fg(['./content/**/*.mdx']);

  const scan = files.map(async (file) => {
    const fileContent = await fs.readFile(file);
    const { content, data } = matter(fileContent.toString());

    const resource = {
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const processed = await createResource(resource);

    return {
      file,
      data,
      processed,
    };
  });

  console.log('Ingesting content...');
  const results = await Promise.all(scan);
  console.log('Ingested content:', results);
}
