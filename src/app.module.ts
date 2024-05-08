import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './app/books/books.module';
import { MoviesModule } from './app/movies/movies.module';

@Module({
  imports: [DatabaseModule, UserModule, BooksModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
