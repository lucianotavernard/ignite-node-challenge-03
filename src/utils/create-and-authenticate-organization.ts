import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await request(app.server).post('/organizations').send({
    name: 'Adote',
    email: 'johndoe@example.com',
    password: '12345678',
    responsableName: 'John Doe',
    whatsapp: '84999999999',
    zipcode: '59000000',
    address: 'Av dos testes unitários',
    city: 'Natal',
    uf: 'RN',
  })

  const authResponse = await request(app.server)
    .post('/organizations/sessions')
    .send({
      email: 'johndoe@example.com',
      password: '12345678',
    })

  const { token } = authResponse.body

  return {
    token,
  }
}
