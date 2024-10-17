import { Injectable } from '@nestjs/common';
import { setMaxListeners } from 'events';
import { CreatePostDTO } from 'src/auth/dto/createPostDTO';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {


    constructor(private readonly prismaService : PrismaService){}

    async create(createPostDTO: CreatePostDTO, userId: any) {
        const {body, title} = createPostDTO
        await this.prismaService.post.create({data : {body,title,userId}})
        return {data : "post created"}
    }
    // ded
    // ede
    // declared
    // ed
    // ed
    //                  1:2-;34
    // xsxsx
    // sxsx
    // setMaxListenersxs
    // x    
}
