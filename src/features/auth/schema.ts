import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email")),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

/**
 * Formik `validate` function backed by the zod schema: returns the first
 * message per field, or `{}` when the values are valid.
 */
export const validateLogin = (values: LoginValues) => {
  const result = loginSchema.safeParse(values);
  if (result.success) return {};

  const errors: Partial<Record<keyof LoginValues, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof LoginValues;
    errors[field] ??= issue.message;
  }
  return errors;
};
