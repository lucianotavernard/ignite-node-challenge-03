import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'

import { AuthenticateUseCase } from '@/usecases/authenticate'
import { InvalidCredentialsError } from '@/usecases/errors/invalid-credentials-error'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
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

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
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

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
