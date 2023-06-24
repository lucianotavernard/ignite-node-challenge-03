import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/usecases/factories/make-create-pet-usecase'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    age: z.enum(['Puppy', 'Adult', 'Senior']),
    size: z.enum(['Low', 'Medium', 'High']),
    environment: z.enum(['Small', 'Medium', 'Large']),
    energyLevel: z.enum(['Calm', 'Peaceful', 'Fussy']),
    independenceLevel: z.enum(['Low', 'Medium', 'High']),
  })

  const organizationId = request.user.sub

  const {
    name,
    description,
    age,
    size,
    environment,
    energyLevel,
    independenceLevel,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    description,
    organizationId,
    independenceLevel,
    energyLevel,
    environment,
    size,
    age,
  })

  return reply.status(201).send()
}
