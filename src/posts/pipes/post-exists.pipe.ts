import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { PostsService } from '../posts.service';
import { Post } from '../interfaces/Post.interface';

@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor(private readonly postsService: PostsService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.postsService.findOne(value);
    } catch (e) {
      throw new NotFoundException('Post not found.');
    }
    return value;
  }
}
