import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, _res: Response, next: NextFunction) {
    //do some logic here

    next();
  }
}
