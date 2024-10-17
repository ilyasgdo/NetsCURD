import { Body, Controller,Delete,Get,Post, Req, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signupDTO';
import { SigninDto } from './dto/signinDTO';
import { resetPasswordDTO } from './dto/resetPasswordDTO';
import { JwtStrategy } from './strategy.service';
import{Request} from "express"

import { ResetPasswordConfirmationDTO } from './dto/resetPasswordConfirmationDTO';


import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { DeleteAccountDto } from './dto/deleteAccountDto';

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

    @UseGuards(AuthGuard('jwt'))
    @Delete("delete")
    deleteAccount(@Req() request : Request,@Body() deleteAccountDto:DeleteAccountDto ){
       const userId=  request.user["userId"];
       return this.authService.deleteAccount(userId,deleteAccountDto)
    }



    @Get()
    test(){
        return this.authService.testt();
    }
}
