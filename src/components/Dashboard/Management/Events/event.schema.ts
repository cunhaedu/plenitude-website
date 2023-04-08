import { isBefore } from 'date-fns';
import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2mb
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function hasAtLeastOneImage(files: any) {
  return files && files.length && !!files.item(0)
}

export const eventSchema =
  z.object({
    title: z.string().nonempty({
      message: 'O titulo é obrigatório',
    }),
    link: z.string().url().optional().nullable(),
    rangeDate: z.any()
      .array()
      .min(2)
      .refine((data) =>
        isBefore(data[0], data[1]),
        'Data final deve ser depois da data inicial'
      )
      .refine((data) =>
        new Date(data[0]) > new Date(),
        'Data inicial não pode ser menor que hoje'
      ),
    cover: z.any()
    .refine((files) => hasAtLeastOneImage(files), "A imagem de perfil é obrigatória")
    .refine((files) => hasAtLeastOneImage(files) && files.item(0)!.size <= MAX_FILE_SIZE, `Tamanho máximo de 5MB`)
    .refine(
      (files) => hasAtLeastOneImage(files) && ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
      "Formato de imagem inválido"
    ).transform(files => {
      return files.item(0)!
    }),
  })

export type EventData = z.infer<typeof eventSchema>;
