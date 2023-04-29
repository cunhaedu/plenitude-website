import { z } from 'zod';

export const testimonialSchema = z.object({
  name: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(name => {
    return name
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  description: z.string().nonempty({
    message: 'A descrição é obrigatória',
  })
    .max(560)
    .min(10, 'Testemunho deve ter mais de 10 caracteres'),
});

export type TestimonialData = z.infer<typeof testimonialSchema>;
