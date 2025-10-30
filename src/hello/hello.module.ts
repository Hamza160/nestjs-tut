import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  imports: [],
  exports: [HelloService],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
