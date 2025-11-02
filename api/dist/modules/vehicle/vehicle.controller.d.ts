import { VehicleService } from '@/modules/vehicle/vehicle.service';
import { VehicleDto, PartialVehicleDto } from '@/modules/vehicle/dto/vehicle.dto';
import { NormalizedVehicle } from './types/vehicle.types';
import { ApiResponse } from '@/common/types/api-response.interface';
import { LogService } from '@/common/services/log.service';
export declare class VehicleController {
    private vehicleService;
    private logService;
    constructor(vehicleService: VehicleService, logService: LogService);
    getALL(userId?: number): Promise<ApiResponse<NormalizedVehicle[]>>;
    create(payload: VehicleDto, userId: number): Promise<ApiResponse<NormalizedVehicle>>;
    update(id: number, payload: PartialVehicleDto, userId: number): Promise<ApiResponse<NormalizedVehicle | null>>;
    delete(id: number, userId: number): Promise<ApiResponse<{
        id: number;
    }>>;
}
