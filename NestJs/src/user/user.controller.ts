import { Controller, Post, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async login(req: Request, res: Response, body: UserDto) {
    let data = await this.userService.login(req.body);
    return res.status(HttpStatus.OK).json({
      message: 'Login Success',
      data,
    });
  }

  async googleLogin(req: Request, res: Response, body: { idToken: string }) {
    let data = await this.userService.googleLogin(req.body);
    return res.status(HttpStatus.OK).json({
      message: 'Login Success',
      data,
    });
  }

  async facebookLogin(
    req: Request,
    res: Response,
    body: { accessToken: string },
  ) {
    let data = await this.userService.facebookLogin(req.body);
    return res.status(HttpStatus.OK).json({
      message: 'Login Success',
      data,
    });
  }

  async appleAuthUrl(req: Request, res: Response, body: {}) {
    let data = await this.userService.appleAuthUrl();
    return res.status(HttpStatus.OK).json({
      data,
    });
  }
  async appleLogin(req: Request, res: Response, body: any) {
    let data = await this.userService.appleLogin(body.idToken, body);
    return res.status(HttpStatus.OK).json({
      message: 'Login Success',
      data,
    });
  }
}
