import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

}
