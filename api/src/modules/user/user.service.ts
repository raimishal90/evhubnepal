import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { UserMetaService } from '@/modules/user-meta/user-meta.service';

import { NormalizeUser, UserWithRelation } from '@/modules/user/type/user.type';

import { UserDto } from '@/modules/user/dto/user.dto';
import { PartialUserDto } from '@/modules/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userMetaService: UserMetaService,
  ) {}

  async get(): Promise<NormalizeUser[]> {
    // We don't need to specify the type here as PrismaService already has the type defined
    const users = await this.prismaService.user.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        meta: true,
        role: true,
      },
    });

    return users.map((user: UserWithRelation) => this.getResponseObject(user));
  }

  private getResponseObject(user: UserWithRelation): NormalizeUser {
    return {
      ...user,
      roleId: user.role.id,
      role: user.role.name,
      meta: this.userMetaService.transform(user.meta),
    };
  }

  private async getWhere(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<NormalizeUser | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        meta: true,
        role: true,
      },
    });

    if (!user) return null;

    return this.getResponseObject(user);
  }

  async getByEmail(email: string): Promise<NormalizeUser | null> {
    return this.getWhere({ email });
  }

  async getById(id: number): Promise<NormalizeUser | null> {
    return this.getWhere({ id });
  }

  async create(
    payload: UserDto,
    roleId: number = 1, // Default to roleId 1 [admin for now] if not provided
  ): Promise<NormalizeUser | null> {
    const { meta, ...data } = payload;
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        roleId,
      },
    });

    if (meta) {
      await this.userMetaService.create(user.id, meta);
    }

    return await this.getById(user.id);
  }

  async update(
    id: number,
    payload: PartialUserDto,
  ): Promise<NormalizeUser | null> {
    const { meta, ...data } = payload;

    await this.prismaService.user.update({
      where: { id },
      data,
    });

    if (meta) {
      await this.userMetaService.update(id, meta);
    }

    return await this.getById(id);
  }

  async delete(id: number, softDelete: Boolean = true): Promise<Boolean> {
    if (softDelete) {
      await this.prismaService.user.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return true;
    }

    await this.prismaService.userMeta.deleteMany({
      where: {
        id,
      },
    });

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return true;
  }
}
