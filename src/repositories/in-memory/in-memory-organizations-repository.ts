import { randomUUID } from 'node:crypto'
import { Organization } from '@prisma/client'

import {
  OrganizationsRepository,
  CreateOrganizationParams,
} from '@/repositories/organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByName(name: string) {
    const user = this.items.find((item) => item.name === name)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create({
    name,
    email,
    passwordHash,
    responsableName,
    zipcode,
    address,
    city,
    uf,
  }: CreateOrganizationParams) {
    const organization = {
      id: randomUUID(),
      name,
      email,
      passwordHash,
      responsableName,
      zipcode,
      address,
      city,
      uf,
      createdAt: new Date(),
    } as Organization

    this.items.push(organization)

    return organization
  }
}
