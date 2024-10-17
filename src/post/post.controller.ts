import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDTO } from 'src/auth/dto/createPostDTO';
import { Request } from 'express';


@Controller('posts')
export class PostController {

    constructor(private readonly postService: PostService) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    create(@Body() createPostDTO: CreatePostDTO, @Req() request: Request) {

        const userId = request.user["userId"]
        return this.postService.create(createPostDTO, userId)


    }
}
