import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { CreatePetUseCase } from './create-pet'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let organizationRepository: InMemoryOrganizationsRepository
let petRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationsRepository()
    petRepository = new InMemoryPetsRepository()

    sut = new CreatePetUseCase(petRepository, organizationRepository)
  })

  it('should be able to create a new pet', async () => {
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

    const { pet } = await sut.execute({
      name: 'Little Puppy',
      description: 'Pet very calm',
      age: 'Puppy',
      size: 'Low',
      environment: 'Small',
      energyLevel: 'Calm',
      independenceLevel: 'Low',
      organizationId: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be able to create a new pet without description', async () => {
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

    const { pet } = await sut.execute({
      name: 'Little Puppy',
      age: 'Puppy',
      size: 'Low',
      environment: 'Small',
      energyLevel: 'Calm',
      independenceLevel: 'Low',
      organizationId: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with a non-existing organization', async () => {
    await expect(() =>
      sut.execute({
        name: 'Little Puppy',
        age: 'Puppy',
        size: 'Low',
        environment: 'Small',
        energyLevel: 'Calm',
        independenceLevel: 'Low',
        organizationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
