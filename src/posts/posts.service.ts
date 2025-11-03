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

  create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      id: this.getNextId(),
      ...createPostData,
      createdAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>) {
    const currentPostIndexToEdit = this.posts.findIndex(
      (post) => post.id === id,
    );

    if (currentPostIndexToEdit === -1) {
      throw new NotFoundException('Post not found');
    }

    this.posts[currentPostIndexToEdit] = {
      ...this.posts[currentPostIndexToEdit],
      ...updatePostData,
      updatedAt: new Date(),
    };

    return this.posts[currentPostIndexToEdit];
  }

  delete(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }
    this.posts.splice(postIndex, 1);
    return { message: 'Post deleted successfully.' };
  }
  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }
}
