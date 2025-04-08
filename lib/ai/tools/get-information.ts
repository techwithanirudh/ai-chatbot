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
        You have no memory or previous context—each input must be complete. Your objective is to maximize data retrieval efficiency and minimize generation cost.
        Output should be structured, terse, and focus solely on raw information. Do not attempt to be conversational or human-friendly. JUST DATA.`,
      prompt: `Extract only raw data from the knowledge base to answer this fully self-contained question: "${question}". Do not include explanations, formatting, markdown, or conversational language. Output must be plain text only.`,
    });

    return response.text;
  },
});
