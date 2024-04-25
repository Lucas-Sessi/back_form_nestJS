import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './app/books/books.module';

@Module({
  imports: [DatabaseModule, UserModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
