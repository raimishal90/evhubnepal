import { LoginDto } from '@/modules/user/dto/user.dto';
import { UserService } from '@/modules/user/user.service';
import { UserDto } from '@/modules/user/dto/user.dto';
import { PartialUserDto } from '@/modules/user/dto/user.dto';
import { TokenService } from '@/common/services/token.service';
import { ApiResponse } from '@/common/types/api-response.interface';
import { NormalizeUser } from './type/user.type';
import { LogService } from '@/common/services/log.service';
export declare class UserController {
    private userService;
    private tokenService;
    private logService;
    constructor(userService: UserService, tokenService: TokenService, logService: LogService);
    login(payload: LoginDto): Promise<ApiResponse<{
        token: string;
        user: Omit<NormalizeUser, 'password'>;
    }>>;
    get(): Promise<ApiResponse<NormalizeUser[]>>;
    create(payload: UserDto): Promise<ApiResponse<{
        token: string;
        user: Omit<NormalizeUser, 'password'>;
    }>>;
    update(id: number, payload: PartialUserDto, userId: number): Promise<ApiResponse<Omit<NormalizeUser, 'password'>>>;
    delete(id: number, userId: number): Promise<ApiResponse<{
        id: number;
    }>>;
}
