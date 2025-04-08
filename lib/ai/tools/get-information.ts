import { tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from "@/lib/ai/embedding";

export const getInformation = tool({
  description: `Retrieves information from your knowledge base using RAG (Retrieval-Augmented Generation). Ideal for answering questions by fetching relevant content based on semantic similarity.`,
  parameters: z.object({
    question: z.string().describe('the users question'),
    similarQuestions: z.array(z.string()).describe('keywords to search'),
  }),
  execute: async ({ similarQuestions }) => {
    const results = await Promise.all(
      similarQuestions.map(
        async (question) => await findRelevantContent(question),
      ),
    );
    // Flatten the array of arrays and remove duplicates based on 'name'
    const uniqueResults = Array.from(
      new Map(results.flat().map((item) => [item?.name, item])).values(),
    );
    return uniqueResults;
  },
});
