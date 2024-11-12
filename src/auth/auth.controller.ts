
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from 'src/guards/decorators/roles.decorator';
import { Role } from 'src/emun/role.enum';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin,Role.User)
    @Get('token')
    refreshToken(@Request() req) {
      const email = req.user.username
      return this.authService.refreshToken(email)
    }
  
    @UseGuards(AuthGuard)
    @Roles(Role.Admin,Role.User)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  