import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('user/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostUserById(id);
  }
}
