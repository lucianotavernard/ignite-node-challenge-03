import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateOrganizationUseCase } from '@/usecases/factories/make-create-organization-usecase'
import { OrganizationAlreadyExistsError } from '@/usecases/errors/organization-already-exists-error'

export async function createOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    responsableName: z.string(),
    whatsapp: z.string().length(11),
    zipcode: z.string().length(8),
    address: z.string(),
    city: z.string(),
    uf: z.string().length(2),
  })

  const {
    name,
    email,
    password,
    responsableName,
    whatsapp,
    zipcode,
    address,
    city,
    uf,
  } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateOrganizationUseCase()

    await createUseCase.execute({
      name,
      email,
      password,
      responsableName,
      whatsapp,
      zipcode,
      address,
      city,
      uf,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
