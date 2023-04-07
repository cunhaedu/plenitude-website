import { z } from 'zod';
import { isBefore } from 'date-fns';

export const eventSchema =
  z.object({
    title: z.string().nonempty({
      message: 'O titulo é obrigatório',
    }),
    initialDate: z
      .date({ required_error: 'Data de início é obrigatória' })
      .min(new Date(), { message: "A data do evento deve ser maior que hoje" }),
    endDate: z.date({ required_error: 'Data final é obrigatória' }),
    link: z.string().url().optional().nullable(),
  })
  .refine((data) =>
    isBefore(data.endDate, data.initialDate),
    'Data final deve ser depois da data inicial'
  )

export type EventData = z.infer<typeof eventSchema>;
