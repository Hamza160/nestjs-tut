import { Injectable } from '@nestjs/common';
import { HelloService } from '../hello/hello.service';

@Injectable()
export class UserService {
  constructor(private readonly helloService: HelloService) {}

  getAllUsers() {
    return [
      {
        id: 1,
        name: 'John Doe',
      },
      {
        id: 2,
        name: 'Jane Doe',
      },
      {
        id: 3,
        name: 'Jena Doe',
      },
    ];
  }

  getUserById(id: number) {
    return this.getAllUsers().find((user) => user.id === id);
  }

  getWelcomeMessage(userId: number) {
    const user = this.getAllUsers().find((user) => user.id === userId);
    if (!user) {
      return 'User not found';
    }

    return this.helloService.getHelloWithName(user.name);
  }
}
