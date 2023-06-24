import { expect, it, describe, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { hash } from 'bcryptjs'

import { SearchPetsUseCase } from './search-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let petRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    sut = new SearchPetsUseCase(petRepository)
  })

  it('should be able to search for pets using params', async () => {
    const organization = await organizationRepository.create({
      name: 'Adote',
      email: 'johndoe@example.com',
      passwordHash: await hash('12345678', 8),
      responsableName: 'John Doe',
      whatsapp: '84999999999',
      zipcode: '59000000',
      address: 'Av dos testes unitários',
      city: 'Natal',
      uf: 'RN',
    })

    for (let i = 1; i <= 2; i++) {
      await petRepository.create({
        id: randomUUID(),
        name: `pet-0${i}`,
        description: 'Pet muito calmo',
        age: 'Puppy',
        size: 'Low',
        environment: 'Small',
        energyLevel: 'Calm',
        independenceLevel: 'Low',
        organizationId: organization.id,
      })
    }

    const { pets } = await sut.execute({
      city: 'Natal',
      age: 'Puppy',
    })

    expect(pets).toHaveLength(2)
  })
})
