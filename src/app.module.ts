import { Module } from '@nestjs/common';
import{ConfigFactory, ConfigModule} from "@nestjs/config"
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, PrismaModule, MailerModule, PostModule],
  
})
export class AppModule {}
