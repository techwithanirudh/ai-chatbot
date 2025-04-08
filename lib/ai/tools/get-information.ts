import { generateText, tool } from 'ai';
import { z } from 'zod';
import { myProvider } from '../providers';
import path from 'node:path';
import fs from 'node:fs/promises';

export const getInformation = tool({
  description: `Uses a Small Language Model (SLM) with a preloaded domain-specific knowledge base to answer questions. Since the model has no prior conversational context, the full question must include all relevant context. The response is optimized to extract maximum information from the knowledge base with minimal generation effort.`,
  parameters: z.object({
    question: z.string().describe('the user\'s question, with all the context, this is used to provide a knowledge base response'),
  }),
  execute: async ({ question }) => {
    const llmsFullTxt = await fs.readFile(
      path.join(process.cwd(), 'content', 'llms-full.txt'),
    ).then((data) => data.toString());
    
    const response = await generateText({
      model: myProvider.languageModel('artifact-model'),
      system:
        `You are a small language model (SLM) with access to domain-specific knowledge from the following content: ${llmsFullTxt}.
        The model does not retain any previous conversational context, so the user's question includes all necessary information.
        Generate a detailed and information-rich response based solely on the knowledge base content.`,
      prompt: `Answer the following fully self-contained question using the knowledge base provided: "${question}". Your response should be optimized for maximal knowledge retrieval and minimal fluff.`
    });

    return response.text;
  },
});
