import { PrismaService } from '@/modules/prisma/prisma.service';
import { UserMetaService } from '@/modules/user-meta/user-meta.service';
import { NormalizeUser } from '@/modules/user/type/user.type';
import { UserDto } from '@/modules/user/dto/user.dto';
import { PartialUserDto } from '@/modules/user/dto/user.dto';
export declare class UserService {
    private readonly prismaService;
    private readonly userMetaService;
    constructor(prismaService: PrismaService, userMetaService: UserMetaService);
    get(): Promise<NormalizeUser[]>;
    private getResponseObject;
    private getWhere;
    getByEmail(email: string): Promise<NormalizeUser | null>;
    getById(id: number): Promise<NormalizeUser | null>;
    create(payload: UserDto, roleId?: number): Promise<NormalizeUser | null>;
    update(id: number, payload: PartialUserDto): Promise<NormalizeUser | null>;
    delete(id: number, softDelete?: Boolean): Promise<Boolean>;
}
