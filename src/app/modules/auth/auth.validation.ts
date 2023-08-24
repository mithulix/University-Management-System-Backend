import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
        required_error: "ID not provided"
    }),
    password: z.string({
        required_error: "Password not provided"
    })
  }),
});

export const AuthValidation = {
    loginZodSchema,
};
