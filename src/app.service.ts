import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    const APP_NAME = this.configService.get<string>('APP_NAME')!;
    return 'Hello World! ' + APP_NAME;
  }
}
