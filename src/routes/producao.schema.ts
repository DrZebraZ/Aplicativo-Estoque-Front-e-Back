import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const id = {
  id: z.bigint({required_error: "Precisa informar o ID"})
}

const id_produto = {
  id_produto: z.bigint({required_error: "Precisa informar um id_produto"})
  }

const quantia = {
  quantia: z.bigint({required_error: "Precisa informar uma quantidade"}),
}

const id_costureiro = {
  id_costureiro: z.number({required_error:"Precisa informar um costureiro(a)"}),
}

const deleted_at = {
  deleted_at: z.date()
}

const AddProducaoSchema = z.object({
  ...id_produto,
  ...quantia
})
export type AddProducaoSchema = z.infer<typeof AddProducaoSchema>

const FinalizaProducaoSchema = z.object({
  ...id_produto,
  ...quantia,
  ...id_costureiro
})
export type FinalizaProducaoSchema = z.infer<typeof FinalizaProducaoSchema>

const models = {
  AddProducaoSchema,
  FinalizaProducaoSchema
}

const options = {
  $id: "producaoSchema"
};

export const { schemas: producaoSchema, $ref } = buildJsonSchemas(models, options);

