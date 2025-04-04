import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9_]+$/).min(3, {
    message: "Username should be at least 3 characters",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type SignIn = z.infer<typeof SignInSchema>;

export const RegisterSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9_]+$/).min(3, {
    message: "Username should be at least 3 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
export type Register = z.infer<typeof RegisterSchema>;