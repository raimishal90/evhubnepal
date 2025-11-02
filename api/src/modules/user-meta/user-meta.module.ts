import { Module } from '@nestjs/common';
import { UserMetaService } from '@/modules/user-meta/user-meta.service';

@Module({
  providers: [UserMetaService],
})
export class UserMetaModule {}
