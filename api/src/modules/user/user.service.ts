import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import * as crypto from 'crypto';

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

  async delete(id: number, softDelete: boolean = true): Promise<boolean> {
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

  async createPasswordResetToken(userId: number): Promise<string> {
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');

    // Token expires in 1 hour
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Invalidate any existing unused tokens for this user
    await this.prismaService.passwordResetToken.updateMany({
      where: {
        userId,
        used: false,
      },
      data: {
        used: true,
      },
    });

    // Create new token
    await this.prismaService.passwordResetToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });

    return token;
  }

  async validatePasswordResetToken(token: string): Promise<number | null> {
    const resetToken = await this.prismaService.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return null;
    }

    // Check if token is already used
    if (resetToken.used) {
      return null;
    }

    // Check if token is expired
    if (new Date() > resetToken.expiresAt) {
      return null;
    }

    return resetToken.userId;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const userId = await this.validatePasswordResetToken(token);

    if (!userId) {
      return false;
    }

    // Update user password
    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    // Mark token as used
    await this.prismaService.passwordResetToken.update({
      where: { token },
      data: { used: true },
    });

    return true;
  }
}
