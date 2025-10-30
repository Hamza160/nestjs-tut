import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(private userService: UserService) {}

  getPostUserById(postId: number) {
    return this.userService.getUserById(postId);
  }
}
