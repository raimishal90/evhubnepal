import { Module } from '@nestjs/common';
import { VehicleMetaService } from '@/modules/vehicle-meta/vehicle-meta.service';

@Module({
  providers: [VehicleMetaService],
})
export class VehicleMetaModule {}
