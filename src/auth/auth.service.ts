import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signupDTO';
import { SigninDto } from './dto/signinDTO';

import * as bcrypt from "bcrypt"
import * as speakeasy from "speakeasy"
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { resetPasswordDTO } from './dto/resetPasswordDTO';

@Injectable()
export class AuthService {
    



    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: MailerService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    //incription
    async signup(SignupDto: SignupDto) {
        const { email, password, username } = SignupDto
        const user = await this.prismaService.uSER.findUnique({ where: { email } })
        if (user) throw new ConflictException("User already exist");

        const hash = await bcrypt.hash(password, 10)

        await this.prismaService.uSER.create({ data: { email, username, password: hash } })
        await this.emailService.sendSignupEmail(email)
        return { data: 'user created' }

    }
    //connection
    async signin(signinDto: SigninDto) {

        const { email, password } = signinDto
        const user = await this.prismaService.uSER.findUnique({ where: { email } })
        if (!user) throw new NotFoundException("user no found");
        const match = await bcrypt.compare(password, user.password);

        if (!match) throw new UnauthorizedException("password not match with the email")
        const payload = {
            sub: user.userId,
            email: user.email
        }
        const token = this.jwtService.sign(payload, {
            expiresIn: "5h",
            secret: this.configService.get('SECRET_KEY')
        })
        return {
            token,user : {
                username : user.username,
                mail: user.email
            }
        }


    }

    async resetPassword(resetPasswordDTO: resetPasswordDTO) {
        
        const { email } = resetPasswordDTO
        const user = await this.prismaService.uSER.findUnique({ where: { email } })
        if (!user) throw new ConflictException("User not found");
        const code =  speakeasy.totp({
            secret : this.configService.get("OTP_CODE"),
            digits : 5,
            step : 60*15,
            encoding : "base32"
        })
        const url ="http://localhost:3000/auth/reset-password-confirmation"
        await this.emailService.sendResetPassword(email,url,code)
        return {data : "Reset password mail has been send"}




    }
    


    testt() {
        return "hello world"
    }

}
