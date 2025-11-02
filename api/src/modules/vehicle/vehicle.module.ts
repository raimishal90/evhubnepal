import { Module } from '@nestjs/common';
import { VehicleController } from '@/modules/vehicle/vehicle.controller';
import { VehicleService } from '@/modules/vehicle/vehicle.service';
import { VehicleMetaService } from '@/modules/vehicle-meta/vehicle-meta.service';
import { LogService } from '@/common/services/log.service';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, VehicleMetaService, LogService],
})
export class VehicleModule {}
