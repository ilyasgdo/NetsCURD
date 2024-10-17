import { Body, Controller,Get,Post } from '@nestjs/common';
import { SignupDto } from './dto/signupDTO';
import { SigninDto } from './dto/signinDTO';
import { resetPasswordDTO } from './dto/resetPasswordDTO';

import { ResetPasswordConfirmationDTO } from './dto/resetPasswordConfirmationDTO';


import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService :AuthService){}
    @Post("signup")
    signup(@Body() signupDto:SignupDto){
        return this.authService.signup(signupDto)
    }

    //connection
    @Post("signin")
    signin(@Body() signinDto:SigninDto){
        return this.authService.signin(signinDto)
    }
    @Post("reset-password")
    resetPassword(@Body() resetPasswordDTO:resetPasswordDTO){
        return this.authService.resetPassword(resetPasswordDTO);
    }
    @Post("reset-password-confirmation")
    resetPasswordConfirmation(@Body() resetPasswordConfirmationDTO:ResetPasswordConfirmationDTO){
        return this.authService.resetConfirmation(resetPasswordConfirmationDTO);
    }




    @Get()
    test(){
        return this.authService.testt();
    }
}
