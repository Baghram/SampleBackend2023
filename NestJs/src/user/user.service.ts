import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as appleSignIn from 'apple-signin-auth';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { UserDto } from './dto/user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userModel: Model<User>) {}

  async login(body: UserDto) {
    let userExist = await this.userModel
      .findOne({ username: body.username })
      .lean();
    if (!userExist) throw new UnauthorizedException('Invalid Credentials');
    let passCheck = await bcrypt.compare(body.password, userExist.password);
    if (!passCheck) throw new UnauthorizedException('Invalid Credentials');
    let token = jwt.sign({ username: userExist.username }, process.env.SECRET);
    return token;
  }

  async googleLogin(idToken: string) {
    try {
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken,
        audience: [process.env.GOOGLE_CLIENT_ID],
      });
      const payload = ticket.getPayload();
      //User Logic
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async facebookLogin(accessToken: string) {
    try {
      let authenticateToken = await axios({
        url: `https://graph.facebook.com/v12.0/me?fields=id,name,email&access_token=${accessToken}`,
        method: 'GET',
      }).catch((err) => {
        if (err.response.data.error.type === 'OAuthException') {
          throw new UnauthorizedException('invalid token');
        }
      });
      let payload;
      if (authenticateToken) {
        payload = {
          name: authenticateToken.data.name,
          email: authenticateToken.data.email,
          sub: authenticateToken.data.sub,
        };
      }
      let token = await jwt.sign(
        { username: payload.name },
        process.env.SECRET,
      );
      return token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('invalid token');
    }
  }

  async appleAuthUrl() {
    return `https://appleid.apple.com/auth/authorize?client_id=${
      process.env.APPLE_CLIENT_ID
    }&redirect_uri=${[
      process.env.APPLE_REDIRECT_URL,
    ]}&response_type=code id_token&state=state&scope=name%20email&response_mode=form_post`;
  }

  async appleCallback(body: any) {
    let callbackData: any = {
      code: body.code,
      state: body.state,
      id_token: body.id_token,
      user: body.user
        ? JSON.parse(body.user)
        : { name: { firstName: null, lastName: null }, email: null },
    };
    let publicKey = process.env.APPLEPK.replace(/\\n/g, '\n'); // either this or put apple public key file in and fs.readFileSyinc(applekey location)
    const claims = {
      iss: process.env.APPLE_TEAM_ID,
      aud: 'https://appleid.apple.com',
      sub: process.env.APPLE_CLIENT_ID,
    };
    const headers = {
      kid: process.env.APPLE_KEY_IDENTIFIER,
      typ: undefined,
      alg: 'ES256',
    };
    const clientSecret = jwt.sign(claims, Buffer.from(publicKey, 'utf8'), {
      algorithm: 'ES256',
      header: headers,
      expiresIn: '24h',
    });
    const options = {
      clientID: process.env.APPLE_CLIENT_ID, // Apple Client ID
      redirectUri: process.env.APPLE_REDIRECT_URL, // use the same value which you passed to authorisation URL in appleAuthUrl
      clientSecret,
    };
    const tokenResponse = await appleSignIn
      .getAuthorizationToken(body.code, options)
      .catch((err) => {
        console.log(`[${new Date()}] Failed to get authorization apple token`);
        console.log(err);
      });

    return { authToken: tokenResponse, data: callbackData };
  }

  async appleLogin(idToken: string, body: any) {
    try {
      const tokenData = await appleSignIn
        .verifyIdToken(idToken, {
          audience: [
            process.env.APPLE_CLIENT_ID,
            process.env.APPLE_PARENT_CLIENT_ID,
          ],
          // nonce: 'NONCE',
          ignoreExpiration: true,
        })
        .catch(async (err) => {});
      let username = body.name.firstName;
      //create user logic
      let token = await jwt.sign({ username }, process.env.SECRET);
      return token;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
