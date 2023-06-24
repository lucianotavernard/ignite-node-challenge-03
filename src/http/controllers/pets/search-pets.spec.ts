import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/create-and-authenticate-organization'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Thor',
        description: 'Pet very calm',
        age: 'Puppy',
        size: 'Low',
        environment: 'Small',
        energyLevel: 'Calm',
        independenceLevel: 'Low',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Hulk',
        description: 'Pet very calm',
        age: 'Puppy',
        size: 'Low',
        environment: 'Small',
        energyLevel: 'Calm',
        independenceLevel: 'Low',
      })

    const response = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({ city: 'Canoas' })

    expect(response.statusCode).toEqual(200)
  })

  it('should be able to search with query params', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Thor',
        description: 'Pet very calm',
        age: 'Puppy',
        size: 'Low',
        environment: 'Small',
        energyLevel: 'Calm',
        independenceLevel: 'Low',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Hulk',
        description: 'Pet very calm',
        age: 'Puppy',
        size: 'Low',
        environment: 'Small',
        energyLevel: 'Calm',
        independenceLevel: 'Low',
      })

    const response = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({ age: 'Puppy' })

    expect(response.statusCode).toEqual(200)
  })
})
