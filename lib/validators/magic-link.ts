import { z } from 'zod';

export const MagicLinkSchema = z.object({
  email: z.string().email(),
});
export type MagicLink = z.infer<typeof MagicLinkSchema>;
