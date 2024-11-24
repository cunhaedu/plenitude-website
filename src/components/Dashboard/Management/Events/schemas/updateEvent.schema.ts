import { isBefore } from 'date-fns';
import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2mb
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const updateEventSchema =
  z.object({
    title: z.string()
      .min(1, { message: 'O titulo é obrigatório' })
      .refine(data => !data.includes('/'), 'Titulo não pode ter /'),
    link: z.string()
      .url({ message: 'Url Inválida' })
      .optional()
      .or(z.literal('')),
    isImageReplaced: z.boolean().default(false),
    rangeDate: z.object({
      to: z.date(),
      from: z.date(),
    }),
      // .refine((data) =>
      //   isBefore(data[0], data[1]),
      //   'Data final deve ser depois da data inicial'
      // )
      // .refine((data) =>
      //   new Date(data[0]) > new Date(),
      //   'Data inicial não pode ser menor que hoje'
      // ),
    cover: z.any().optional()
      .transform(files => files && files.length ? files.item(0)! : null),
  })
  .superRefine((values, ctx) => {
    if(values.isImageReplaced) {
      if(!values.cover) {
        ctx.addIssue({
          message: 'A imagem é obrigatória',
          code: z.ZodIssueCode.custom,
          path: ['cover'],
        });
      } else if(values.cover.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          message: 'Tamanho máximo de 2MB',
          code: z.ZodIssueCode.custom,
          path: ['cover'],
        });
      } else if(!ACCEPTED_IMAGE_TYPES.includes(values.cover.type)) {
        ctx.addIssue({
          message: 'Formato de imagem inválido',
          code: z.ZodIssueCode.custom,
          path: ['cover'],
        });
      }
    }
  })

export type UpdateEventData = z.infer<typeof updateEventSchema>;
