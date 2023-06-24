import { prisma } from '@/lib/prisma'

import {
  OrganizationsRepository,
  CreateOrganizationParams,
} from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(id: string) {
    return prisma.organization.findUnique({
      where: {
        id,
      },
    })
  }

  async findByName(name: string) {
    return prisma.organization.findUnique({
      where: {
        name,
      },
    })
  }

  async findByEmail(email: string) {
    return prisma.organization.findUnique({
      where: {
        email,
      },
    })
  }

  async create(data: CreateOrganizationParams) {
    return prisma.organization.create({
      data,
    })
  }
}
