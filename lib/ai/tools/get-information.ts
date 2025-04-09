import { generateText, tool } from 'ai';
import { z } from 'zod';
import { myProvider } from '../providers';
import path from 'node:path';
import fs from 'node:fs/promises';
import { getInformationPrompt } from '../prompts';

export const getInformation = tool({
  description: `Efficient Retrieval-Augmented Generation (RAG) tool using a Small Language Model (SLM) for precise information retrieval from a domain-specific knowledge base. Fully self-contained questions are required to provide accurate, concise, yet complete responses. Optimized for effective data extraction with clear and succinct explanations included.`,
  parameters: z.object({
    question: z
      .string()
      .describe(
        'Fully self-contained question including all necessary context for accurate retrieval and explanation from the knowledge base',
      ),
  }),
  execute: async ({ question }) => {
    const response = await generateText({
      model: myProvider.languageModel('artifact-model'),
      system: getInformationPrompt,
      prompt: `Retrieve exact raw data from knowledge base to answer: "${question}". Plain text, minimal length, no markdown formatting or conversation.`,
    });

    return response.text;
  },
});
