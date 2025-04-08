import { generateObject, tool } from 'ai';
import { z } from 'zod';
import { myProvider } from '../providers';

export const understandQuery = tool({
  description: `understand the users query. use this tool on every prompt.`,
  parameters: z.object({
    query: z.string().describe('the users query'),
    toolsToCallInOrder: z
      .array(z.string())
      .describe(
        'these are the tools you need to call in the order necessary to respond to the users query',
      ),
  }),
  execute: async ({ query }) => {
    const { object } = await generateObject({
      model: myProvider.languageModel('artifact-model'),
      system:
        'You are a query understanding assistant. Analyze the user query and generate similar questions.',
      schema: z.object({
        questions: z
          .array(z.string())
          .max(3)
          .describe("similar questions to the user's query. be concise."),
      }),
      prompt: `Analyze this query: "${query}". Provide the following:
                3 similar questions that could help answer the user's query`,
    });
    return object.questions;
  },
});
