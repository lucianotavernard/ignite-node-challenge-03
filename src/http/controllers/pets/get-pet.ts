import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetUseCase } from '@/usecases/factories/make-get-pet-usecase'
import { PetNotFoundError } from '@/usecases/errors/pet-not-found-error'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetParamsSchema.parse(request.params)

  try {
    const getPet = makeGetPetUseCase()

    const { pet } = await getPet.execute({
      petId: id,
    })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
