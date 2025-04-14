import { tool } from 'ai';
import { z } from 'zod';

export const echo = tool({
  description: 'Echo the input back to the user',
  parameters: z.object({
    input: z.string(),
  }),
  execute: async ({ input }) => {
    return {
      success: true,
      result: input,
    };
  },
});
