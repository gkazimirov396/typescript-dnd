import { z } from 'zod';
import type { Project } from '../models/Project';

export const FormSchema = z.strictObject({
  title: z
    .string({
      invalid_type_error: 'Title must be a string.',
    })
    .min(1)
    .max(10),
  description: z
    .string()
    .min(3, 'Description should be at least 3 characters long.')
    .max(15),
  people: z.number().int().gt(0).lte(10),
});

export type ProjectFormData = z.infer<typeof FormSchema>;

export type Listener = (projects: Project[]) => void;
