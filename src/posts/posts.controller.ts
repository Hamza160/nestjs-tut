import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostInterface } from './interfaces/Post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const extractAllPosts = this.postsService.findAll();

    if (search) {
      return extractAllPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return extractAllPosts;
  }
}
