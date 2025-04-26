import { generateText, tool } from 'ai';
import { z } from 'zod';
import { myProvider } from '../providers';
import { getInformationPrompt } from '../prompts';

export const getInformation = tool({
  description: `RAG tool using a Language Model for precise information retrieval from a domain-specific knowledge base. Fully self-contained questions are required to provide accurate, concise, yet complete responses. Always use this tool when domain-specific knowledge is required.`,
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
