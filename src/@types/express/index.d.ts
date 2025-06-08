import { User as JwtPayload } from '../../auth/types';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
