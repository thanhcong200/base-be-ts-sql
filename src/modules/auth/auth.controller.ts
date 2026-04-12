import { UserScope } from '@common/decorators';
import { HeaderScope } from '@common/decorators/header.decorator';
import { BearerGuard, DynamicAuthGuard, HeaderGuard } from '@common/guards';
import { BasicGuard } from '@common/guards/basic.guard';
import { IsMaintenanceGuard } from '@common/guards/is-maintenance.guard';
import { IsUserGuard } from '@common/guards/is-user.guard';
import { Body, Controller, Delete, Get, HttpCode, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailDto, LogoutDto, RefreshTokenDto, TokenDto, UserLoginDto, VerifyOtpDto } from './dto';
import { UserChangePasswordDto } from './dto/change-password.dto';
import { RecoverPasswordDto } from './dto/confirm-forgot-password.dto';
import { AccessToken } from './interfaces';
import { UserRegisterDto } from './dto/register.dto';
import { VefifyEmailDto } from './dto/verfify-email.dto';
import { AppleLoginDto, FacebookLoginDto, GoogleLoginDto } from './dto/social-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LIMIT_THROTTLE } from '@constant/index';
import { USER_CLIENT } from '@common/enums';
import { Request } from 'express';
import { PlatformScope } from '@common/decorators/platform.decorator';
import { Response } from 'express';
import { Query } from '@nestjs/common';
import { OIDC_AUTHORIZATION_ENDPOINT, OIDC_CLIENT_ID, OIDC_REDIRECT_URI, OIDC_SCOPE } from '@configuration/env.config';

@Controller('v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'login' })
  @ApiBody({
    description: 'login',
    type: UserLoginDto,
  })
  @Post('login')
  @HttpCode(200)
  @ApiBasicAuth()
  @UseGuards(BasicGuard, IsUserGuard, IsMaintenanceGuard)
  async login(@Body() body: UserLoginDto, @PlatformScope() platform, @HeaderScope() header): Promise<AccessToken> {
    return this.authService.login(body as any, platform, USER_CLIENT.USER, header);
  }


  @ApiOperation({ summary: 'register' })
  @ApiBody({
    description: 'resgitser',
    type: UserRegisterDto,
  })
  @Post('register')
  @HttpCode(200)
  @ApiBasicAuth()
  @UseGuards(BasicGuard, IsMaintenanceGuard)
  async register(@Body() body: UserRegisterDto, @HeaderScope() header) {
    return this.authService.register(body, header);
  }


  @ApiBody({
    description: 'Log out and remove refresh token',
    type: LogoutDto,
  })
  @ApiOperation({ summary: 'Log out and remove refresh token' })
  @Post('logout')
  @HttpCode(200)
  async logOut(@Body() body: LogoutDto) {
    return await this.authService.logOut(body);
  }

  @ApiOperation({ summary: 'fetch-profile' })
  @ApiBearerAuth()
  @UseGuards(BearerGuard)
  @Get('fetch-profile')
  async profile(@UserScope() user) {
    return this.authService.profile(user);
  }

  @ApiOperation({ summary: 'change-password' })
  @ApiBody({
    description: 'change-password',
    type: UserChangePasswordDto,
  })
  @Put('change-password')
  @ApiBearerAuth()
  @UseGuards(BearerGuard, IsUserGuard)
  async changePassword(@Body() body: UserChangePasswordDto, @HeaderScope() header) {
    const { ...data } = body;
    const user_id = header.user.id;
    await this.authService.changePassword(data, user_id);
  }

  @Get('oidc/authorize')
  async oidcAuthorize(@Res() res: Response) {
    if (!OIDC_AUTHORIZATION_ENDPOINT || !OIDC_CLIENT_ID || !OIDC_REDIRECT_URI) {
      return res.status(400).json({ error: 'OIDC not configured' });
    }
    const params = new URLSearchParams({
      client_id: OIDC_CLIENT_ID,
      response_type: 'code',
      scope: OIDC_SCOPE || 'openid profile email',
      redirect_uri: OIDC_REDIRECT_URI,
    });
    const redirectUrl = `${OIDC_AUTHORIZATION_ENDPOINT}?${params.toString()}`;
    return res.redirect(302, redirectUrl);
  }

  @Get('oidc/callback')
  async oidcCallback(@Query('code') code: string, @HeaderScope() header, @Res() res: Response) {
    if (!code) return res.status(400).json({ error: 'Missing code' });
    try {
      const token = await this.authService.handleOidcCallback(code, header as any);
      // Redirect to frontend with token or return json
      return res.json(token);
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'OIDC callback error' });
    }
  }
}
