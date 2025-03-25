'use server';

import { getSuggestionsByDocumentId } from '@/server/db/queries';

export async function getSuggestions({ documentId }: { documentId: string }) {
  const suggestions = await getSuggestionsByDocumentId({ documentId });
  return suggestions ?? [];
}
