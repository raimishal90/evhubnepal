import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly configService;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
}
