import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/usecases/factories/make-search-pets-usecase'
import { PetNotFoundError } from '@/usecases/errors/pet-not-found-error'

export async function searchPets(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const searchPetsParamsSchema = z.object({
    city: z.string().optional(),
  })

  const searchPetsQuerySchema = z.object({
    age: z.enum(['Puppy', 'Adult', 'Senior']).optional(),
    size: z.enum(['Low', 'Medium', 'High']).optional(),
    environment: z.enum(['Small', 'Medium', 'Large']).optional(),
    energyLevel: z.enum(['Calm', 'Peaceful', 'Fussy']).optional(),
    independenceLevel: z.enum(['Low', 'Medium', 'High']).optional(),
  })

  const { city } = searchPetsParamsSchema.parse(request.params)
  const { age, size, environment, energyLevel, independenceLevel } =
    searchPetsQuerySchema.parse(request.query)

  try {
    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
      size,
      environment,
      energyLevel,
      independenceLevel,
    })

    return response.status(200).send({
      pets,
    })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return response.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
