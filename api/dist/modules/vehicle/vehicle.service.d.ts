import { PrismaService } from '@/modules/prisma/prisma.service';
import { VehicleDto, PartialVehicleDto } from './dto/vehicle.dto';
import { VehicleMetaService } from '@/modules/vehicle-meta/vehicle-meta.service';
import { NormalizedVehicle } from '@/modules/vehicle/types/vehicle.types';
export declare class VehicleService {
    private readonly prismaService;
    private readonly vehicleMetaService;
    constructor(prismaService: PrismaService, vehicleMetaService: VehicleMetaService);
    private getResponseObject;
    getAll(userId?: number): Promise<NormalizedVehicle[]>;
    getById(id: number): Promise<NormalizedVehicle | null>;
    create(userId: number, payload: VehicleDto): Promise<NormalizedVehicle | null>;
    update(where: {
        id: number;
        userId: number;
    }, payload: PartialVehicleDto): Promise<NormalizedVehicle | null>;
    delete(id: number, softDelete?: boolean): Promise<boolean>;
}
