export declare class VehicleDto {
    name: string;
    description?: string;
    regularPrice: number;
    salePrice: number;
    isFeatured?: boolean;
    parentId?: number;
    status?: string;
    meta?: Record<string, string>;
    categoryIds?: number[];
}
declare const PartialVehicleDto_base: import("@nestjs/mapped-types").MappedType<Partial<VehicleDto>>;
export declare class PartialVehicleDto extends PartialVehicleDto_base {
}
export {};
