import * as express from 'express';
import { JwtPayload } from '@/common/types/jwt-payload.interface';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
