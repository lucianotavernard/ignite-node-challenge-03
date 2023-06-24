import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { getPet } from './get-pet'
import { searchPets } from './search-pets'
import { createPet } from './create-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/pets', searchPets)
  app.get('/pets/:id', getPet)
  app.post('/pets', createPet)
}
