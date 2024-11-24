import { isBefore } from 'date-fns';
import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2mb
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function hasAtLeastOneImage(files: any) {
  return files && files.length && !!files.item(0)
}

export const createEventSchema =
  z.object({
    title: z.string()
      .nonempty({ message: 'O titulo é obrigatório' })
      .refine(data => !data.includes('/'), 'Titulo não pode ter /'),
    link: z.string()
      .url({ message: 'Url Inválida' })
      .optional()
      .or(z.literal('')),
    rangeDate: z.object({
      from: z.date(),
      to: z.date(),
    }),
      // .refine((data) =>
      //   isBefore(data[0], data[1]),
      //   'Data final deve ser depois da data inicial'
      // )
      // .refine((data) =>
      //   new Date(data[0]) > new Date(),
      //   'Data inicial não pode ser menor que hoje'
      // ),
    cover: z.any()
      .refine((files) => hasAtLeastOneImage(files), "A imagem é obrigatória")
      .refine((files) => hasAtLeastOneImage(files) && files.item(0)!.size <= MAX_FILE_SIZE, `Tamanho máximo de 2MB`)
      .refine(
        (files) => hasAtLeastOneImage(files) && ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
        "Formato de imagem inválido"
      ).transform(files => {
        return files.item(0)!
      }),
  })

export type CreateEventData = z.infer<typeof createEventSchema>;
