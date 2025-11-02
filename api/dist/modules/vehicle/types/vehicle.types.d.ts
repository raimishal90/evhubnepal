import { Vehicle, VehicleMeta, Category, VehicleCategory } from 'generated/prisma';
export interface VehicleWithRelation extends Vehicle {
    meta: VehicleMeta[];
    categories: (VehicleCategory & {
        category: Category;
    })[];
}
export interface NormalizedVehicle extends Vehicle {
    meta: Record<string, string | object | null>;
    categories: Category[];
}
