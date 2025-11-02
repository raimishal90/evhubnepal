import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { VehicleService } from '@/modules/vehicle/vehicle.service';
import { Public } from '@/common/decorators/public.decorator';
import {
  VehicleDto,
  PartialVehicleDto,
} from '@/modules/vehicle/dto/vehicle.dto';
import { UserId } from '@/common/decorators/user.decorator';
import { NormalizedVehicle } from './types/vehicle.types';
import { ApiResponse } from '@/common/types/api-response.interface';
import { LogService } from '@/common/services/log.service';
import { LogAction } from '@/common/types/log.enum';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private vehicleService: VehicleService,
    private logService: LogService,
  ) {}

  @Public()
  @Get()
  async getALL(
    @UserId() userId?: number,
  ): Promise<ApiResponse<NormalizedVehicle[]>> {
    const data = await this.vehicleService.getAll(userId);

    return {
      status: true,
      data,
      message: 'Fetched successfully.',
    };
  }

  @Post()
  async create(
    @Body() payload: VehicleDto,
    @UserId() userId: number,
  ): Promise<ApiResponse<NormalizedVehicle>> {
    const data = await this.vehicleService.create(userId, payload);

    if (!data) {
      throw new InternalServerErrorException('Internal Server Error.');
    }

    await this.logService.create({
      action: LogAction.CREATE,
      entity: 'Vehicle',
      entityId: data.id,
      performedBy: userId,
      detail: JSON.stringify(payload),
      note: 'Vehicle Created.',
    });

    return {
      status: true,
      data,
      message: 'Created successfully.',
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PartialVehicleDto,
    @UserId() userId: number,
  ): Promise<ApiResponse<NormalizedVehicle | null>> {
    const data = await this.vehicleService.update({ id, userId }, payload);

    if (!data) {
      throw new InternalServerErrorException('Internal Server Error.');
    }

    await this.logService.create({
      action: LogAction.UPDATE,
      entity: 'Vehicle',
      entityId: data.id,
      performedBy: userId,
      detail: JSON.stringify(payload),
      note: 'Vehicle Updated.',
    });

    return {
      status: true,
      data,
      message: 'Updated successfully.',
    };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @UserId() userId: number,
  ): Promise<ApiResponse<{ id: number }>> {
    // we need to check the role later / other users should not be able to delete users
    await this.vehicleService.delete(id);

    await this.logService.create({
      action: LogAction.DELETE,
      entity: 'Vehicle',
      entityId: id,
      performedBy: userId,
      note: 'Soft deleted.',
    });

    return {
      status: true,
      data: { id },
      message: 'Deleted successfully.',
    };
  }
}
