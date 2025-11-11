import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(
    @InjectRepository(Post),
    private postRepository: Repository<Post>

  ) {
  }
  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOneBy({id});
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(createPostData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    const newPost = this.postRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      authorName: createPostData.authorName,
    });

    return this.postRepository.save(newPost);
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
