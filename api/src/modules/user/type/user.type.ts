import { Role, User, UserMeta } from 'generated/prisma';

export interface UserWithRelation extends User {
  role: Role;
  meta: UserMeta[];
}

export interface NormalizeUser extends User {
  role: string;
  meta: Record<string, string | null>;
}
