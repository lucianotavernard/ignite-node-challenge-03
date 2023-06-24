import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate'
import { createOrganization } from './create-organization'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', createOrganization)
  app.post('/organizations/sessions', authenticate)
}
