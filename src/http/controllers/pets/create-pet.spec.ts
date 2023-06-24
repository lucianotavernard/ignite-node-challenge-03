import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Little Puppy',
        description: 'Pet very calm',
        age: 'Puppy',
        size: 'Low',
        environment: 'Small',
        energyLevel: 'Calm',
        independenceLevel: 'Low',
      })

    expect(response.statusCode).toEqual(201)
  })
})
