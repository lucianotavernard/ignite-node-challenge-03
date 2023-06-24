import { prisma } from '@/lib/prisma'
import {
  CreatePetParams,
  PetsRepository,
  SearchPetsParams,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: CreatePetParams) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findMany({
    age,
    size,
    city,
    environment,
    energyLevel,
    independenceLevel,
  }: SearchPetsParams) {
    const where: any = {}

    if (age) {
      where.age = age
    }

    if (size) {
      where.size = size
    }

    if (city) {
      where.organization = {
        city,
      }
    }

    if (environment) {
      where.environment = environment
    }

    if (energyLevel) {
      where.energyLevel = energyLevel
    }

    if (independenceLevel) {
      where.independenceLevel = independenceLevel
    }

    const pets = await prisma.pet.findMany({
      where,
    })

    return pets
  }
}
