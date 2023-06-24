import { expect, describe, it, beforeEach } from 'vitest'

import { CreateOrganizationUseCase } from './create-organization'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should to create a new organization', async () => {
    const { organization } = await sut.execute({
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

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new organization with an existing name', async () => {
    const organization = {
      name: 'Adote',
      email: 'johndoe@example.com',
      password: '12345678',
      responsableName: 'John Doe',
      whatsapp: '84999999999',
      zipcode: '59000000',
      address: 'Av dos testes unitários',
      city: 'Natal',
      uf: 'RN',
    }

    await sut.execute(organization)

    await expect(sut.execute(organization)).rejects.toBeInstanceOf(
      OrganizationAlreadyExistsError,
    )
  })

  it('should not be able to create a new organization with an existing email', async () => {
    const organization = {
      name: 'Adote',
      email: 'johndoe@example.com',
      password: '12345678',
      responsableName: 'John Doe',
      whatsapp: '84999999999',
      zipcode: '59000000',
      address: 'Av dos testes unitários',
      city: 'Natal',
      uf: 'RN',
    }

    await sut.execute(organization)

    await expect(
      sut.execute({
        ...organization,
        name: 'Adote II',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
