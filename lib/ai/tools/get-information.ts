import { generateText, tool } from 'ai';
import { z } from 'zod';
import { myProvider } from '../providers';
import path from 'node:path';
import fs from 'node:fs/promises';

export const getInformation = tool({
  description: `High-efficiency RAG tool that retrieves precise data from a preloaded domain-specific knowledge base using a Small Language Model (SLM). It requires fully self-contained questions to ensure accurate, minimal, and direct extraction of information without additional context. Optimized for maximum data retrieval with minimal generation overhead.`,
  parameters: z.object({
    question: z.string().describe('Fully self-contained question including all relevant context required for accurate data retrieval from the knowledge base'),
  }),
  execute: async ({ question }) => {
    const knowledgeBase = await fs.readFile(
      path.join(process.cwd(), 'content', 'llms-full.txt'),
    ).then((data) => data.toString());

    const response = await generateText({
      model: myProvider.languageModel('artifact-model'),
      system:
        `You are an SLM optimized strictly for data retrieval tasks from this domain-specific knowledge base: ${knowledgeBase}. 
        No conversational context, no explanations, no markdown formatting. Respond with only exact and minimal data necessary to answer the provided question.`,
      prompt: `Retrieve exact raw data from knowledge base to answer: "${question}". Plain text, minimal length, no markdown formatting or conversation.`,
    });

    return response.text;
  },
});
