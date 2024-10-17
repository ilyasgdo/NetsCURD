import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
@Injectable()
export class MailerService {
    

    private async transporter() {
        const testAccount = await nodemailer.createTestAccount();
        const transport = nodemailer.createTransport({
            host: "localhost",
            port: 1025,
            ignoreTLS: true,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        return transport;
    }

    async sendSignupEmail(userEmail: string) {
        (await this.transporter()).sendMail({
            from: "app@localhost.com",
            to: userEmail,
            subject: "inscription",
            html: "<h3> Confirmation of inscription</h3>"

        })
    }
    async sendResetPassword(userEmail : string,url : string, code: string){
        (await this.transporter()).sendMail({
            from: "app@localhost.com",
            to: userEmail,
            subject: "reset password",
            html: `
                
                <h3> reset password</h3>
                <a href=${url}>Reset password<a/>

                <p> Secret code <strong>${code}</strong></p>
                <p>Code will expire in 15 minutes</p>
            `

        })
    }
    async sendUpdateConfirmation(email: string) {
        (await this.transporter()).sendMail({
            from: "app@localhost.com",
            to: email,
            subject: "Password updated",
            html: `
                
                <h3>Password updated</h3>

                
            `

        })
    }
}
