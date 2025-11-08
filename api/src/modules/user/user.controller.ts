import {
  Controller,
  Post,
  Get,
  Body,
  UnauthorizedException,
  Patch,
  ParseIntPipe,
  Param,
  ForbiddenException,
  InternalServerErrorException,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import {
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@/modules/user/dto/user.dto';
import { UserService } from '@/modules/user/user.service';
import { Public } from '@/common/decorators/public.decorator';
import * as hash from '@/common/utils/hash.util';
import { UserDto } from '@/modules/user/dto/user.dto';
import { PartialUserDto } from '@/modules/user/dto/user.dto';
import { TokenService } from '@/common/services/token.service';
import { UserId } from '@/common/decorators/user.decorator';
import { ApiResponse } from '@/common/types/api-response.interface';
import { NormalizeUser } from './type/user.type';
import { LogService } from '@/common/services/log.service';
import { LogAction } from '@/common/types/log.enum';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private logService: LogService,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() payload: LoginDto,
  ): Promise<
    ApiResponse<{ token: string; user: Omit<NormalizeUser, 'password'> }>
  > {
    //
    const { email, password } = payload;

    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Account does not exist.');
    }

    const correctPassword = await hash.compare(password, user.password);

    if (!correctPassword) {
      throw new UnauthorizedException('User credentials are incorrect.');
    }

    const token = await this.tokenService.create(user);
    // Destructure to exclude password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userData } = user;

    return {
      status: true,
      message: 'Logged in successfully.',
      data: { token, user: userData },
    };
  }

  @Get()
  async get(): Promise<ApiResponse<NormalizeUser[]>> {
    //
    const data = await this.userService.get();

    return {
      status: true,
      data,
      message: 'Fetched successfully.',
    };
  }

  @Public()
  @Post()
  async create(
    @Body() payload: UserDto,
  ): Promise<ApiResponse<{ user: Omit<NormalizeUser, 'password'> }>> {
    //
    const createUser = await this.userService.create({
      ...payload,
      password: await hash.create(payload.password),
    });

    if (createUser) {
      // Destructure to exclude password from response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...user } = createUser;

      await this.logService.create({
        action: LogAction.CREATE,
        entity: 'User',
        entityId: user.id,
        performedBy: user.id,
        note: 'User Created.',
      });

      return {
        status: true,
        data: { user },
        message: 'Account created successfully! Please log in to continue.',
      };
    }

    throw new InternalServerErrorException('Internal Server Error.');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PartialUserDto,
    @UserId() userId: number,
  ): Promise<ApiResponse<Omit<NormalizeUser, 'password'>>> {
    //
    if (id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this user.',
      );
    }

    const data = await this.userService.update(id, payload);

    if (!data) {
      throw new InternalServerErrorException('Internal Server Error.');
    }

    await this.logService.create({
      action: LogAction.UPDATE,
      entity: 'User',
      entityId: id,
      performedBy: userId,
      detail: JSON.stringify(payload),
      note: 'User Updated.',
    });

    // Destructure to exclude password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...user } = data;

    return {
      status: true,
      data: user,
      message: 'Updated successfully.',
    };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @UserId() userId: number,
  ): Promise<ApiResponse<{ id: number }>> {
    // we need to check the role later / other users should not be able to delete users
    await this.userService.delete(id);

    await this.logService.create({
      action: LogAction.DELETE,
      entity: 'User',
      entityId: id,
      performedBy: userId,
      note: 'Soft deleted.',
    });

    return {
      status: true,
      data: { id },
      message: 'Deleted successfully',
    };
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(
    @Body() payload: ForgotPasswordDto,
  ): Promise<ApiResponse<{ message: string }>> {
    const { email } = payload;

    const user = await this.userService.getByEmail(email);

    if (!user) {
      // For security, don't reveal if the email exists
      return {
        status: true,
        message:
          'If an account with that email exists, a password reset link has been sent.',
        data: { message: 'Password reset email sent' },
      };
    }

    const token = await this.userService.createPasswordResetToken(user.id);

    // TODO: Send email with reset link containing the token
    // For now, we'll log it to the console
    console.log(`Password reset token for ${email}: ${token}`);
    console.log(
      `Reset link: http://localhost:3000/reset-password?token=${token}`,
    );

    await this.logService.create({
      action: LogAction.UPDATE,
      entity: 'User',
      entityId: user.id,
      performedBy: user.id,
      note: 'Password reset requested.',
    });

    return {
      status: true,
      message:
        'If an account with that email exists, a password reset link has been sent.',
      data: { message: 'Password reset email sent' },
    };
  }

  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body() payload: ResetPasswordDto,
  ): Promise<ApiResponse<{ message: string }>> {
    const { token, password } = payload;

    if (!token || !password) {
      throw new BadRequestException('Token and password are required.');
    }

    // Hash the new password
    const hashedPassword = await hash.create(password);

    // Reset the password
    const success = await this.userService.resetPassword(token, hashedPassword);

    if (!success) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    // Get user ID from token for logging
    const userId = await this.userService.validatePasswordResetToken(token);
    if (userId) {
      await this.logService.create({
        action: LogAction.UPDATE,
        entity: 'User',
        entityId: userId,
        performedBy: userId,
        note: 'Password reset completed.',
      });
    }

    return {
      status: true,
      message:
        'Password has been reset successfully. You can now log in with your new password.',
      data: { message: 'Password reset successful' },
    };
  }
}
