import { randomUUID } from 'crypto'

import { Pet } from '@prisma/client'
import {
  CreatePetParams,
  PetsRepository,
  SearchPetsParams,
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: CreatePetParams) {
    const newPet = {
      id: randomUUID(),
      createdAt: new Date(),
      organizationId: data.organizationId,
      name: data.name,
      description: data.description ? data.description : null,
      age: data.age,
      size: data.size,
      environment: data.environment,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
    } as Pet

    this.items.push(newPet)

    return newPet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findMany({
    age,
    size,
    environment,
    energyLevel,
    independenceLevel,
  }: SearchPetsParams) {
    let petsFiltered = this.items

    if (independenceLevel) {
      petsFiltered = this.items.filter(
        (item) => item.independenceLevel === independenceLevel,
      )
    }

    if (energyLevel) {
      petsFiltered = this.items.filter(
        (item) => item.energyLevel === energyLevel,
      )
    }

    if (environment) {
      petsFiltered = this.items.filter(
        (item) => item.environment === environment,
      )
    }

    if (size) {
      petsFiltered = this.items.filter((item) => item.size === size)
    }

    if (age) {
      petsFiltered = this.items.filter((item) => item.age === age)
    }

    return petsFiltered
  }
}
