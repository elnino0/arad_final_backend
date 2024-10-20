import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    console.log("username", username)
    console.log("pass", pass)

    const user = await this.usersService.viewUserByName(username);
    console.log("user ", user)
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: user.role, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
}
}