import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(private readonly configService: ConfigService) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates Google OAuth2 login flow
    console.log(111, 'googleAuthr',)
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: any) {
    // Here req.user is set by the strategy
    console.log(111, 'req.user', req.user)

    const token = req.user.loginToken;

    const frontendUrl = this.configService.get("FRONTEND_URL", 'http://localhost:5173');
    res.redirect(`${frontendUrl}/auth/callback?token=${token}`);

  }


  @Get('me')
  @UseGuards(AuthGuard('google'))
  async me(@Req() req, @Res() res: any) {
    // Here req.user is set by the strategy
    
 /// TODO
    // decode token, get user Id
    // reutrn user where token 
  }
}
