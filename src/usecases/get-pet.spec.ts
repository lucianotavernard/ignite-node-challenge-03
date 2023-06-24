import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { GetPetUseCase } from './get-pet'

import { PetNotFoundError } from './errors/pet-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let petRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    sut = new GetPetUseCase(petRepository)
  })

  it('should be able to get an existing pet', async () => {
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

    const newPet = await petRepository.create({
      name: 'Little Puppy',
      description: 'Pet very calm',
      age: 'Puppy',
      size: 'Low',
      environment: 'Small',
      energyLevel: 'Calm',
      independenceLevel: 'Low',
      organizationId: organization.id,
    })

    const { pet } = await sut.execute({
      petId: newPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Little Puppy')
    expect(pet.organizationId).toEqual(organization.id)
  })

  it('should not able be to get pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
