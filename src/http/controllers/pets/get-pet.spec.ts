import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
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

    const petsResponse = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
      .get(`/pets/${petsResponse.body.pets[0].id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Little Puppy',
      }),
    )
  })
})
