import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/Post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First',
      content: 'First Post Content',
      authorName: 'Hamza Ashraf',
      createdAt: new Date(),
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }
}
