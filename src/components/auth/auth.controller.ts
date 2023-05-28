import { Controller, Post, UseGuards, Body, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSignedGuard } from 'src/common/guards/user';
import { AuthLoginBody, AuthRefreshBody } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: AuthLoginBody) {
    return await this.authService.login(body)
  }

  @ApiBearerAuth()
  @UseGuards(UserSignedGuard)
  @Post('logout')
  async logout(@Headers() auth) {
    return await this.authService.logout(auth)
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshToken: AuthRefreshBody) {
    return await this.authService.refreshToken(refreshToken)
  }
}
