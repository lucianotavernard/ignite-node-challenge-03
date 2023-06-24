import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Create Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new organization', async () => {
    const response = await request(app.server).post('/organizations').send({
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

    expect(response.statusCode).toEqual(201)
  })
})
