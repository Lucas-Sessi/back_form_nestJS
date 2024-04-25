import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { head } from 'lodash';
import { GenerateException } from 'src/utils/exceptions/generateExceptionError';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}
  async create(data: CreateBookDto) {
    try {
      const book = this.bookRepository.create(data)

      return await this.bookRepository.save(book);
    } catch (error) {
      console.log("🚀 ~ BooksService ~ create ~ error:", error)
      GenerateException(error)
    }
  }

  async findAll() {
    try {
      const result = await this.bookRepository.find();
      const resultExisted = !!head(result);

      if(!resultExisted) {
        throw new HttpException('Books not found!', HttpStatus.BAD_REQUEST)
      }

      return result;
    } catch (error) {
      GenerateException(error)
    }
  }

  async findOne(id: number) {
    try {
      const findOneBook = await this.bookRepository.findOne({
        where: { id }
      });
      const findOneBookExisted = !!head([findOneBook])

      if(!findOneBookExisted) {
        throw new HttpException('Book not found!', HttpStatus.BAD_REQUEST)
      }

      return findOneBook;
    } catch (error) {
      GenerateException(error)
    }
  }

  async update(id: number, data: UpdateBookDto) {
    try {
      const book = await this.bookRepository.preload({
        ...data,
        id
      })

      if(!book) {
        throw new HttpException('Book not found!', HttpStatus.BAD_REQUEST)
      }
      
      return await this.bookRepository.save(book);
    } catch (error) {
      GenerateException(error)
    }
  }

  async remove(id: number) {
    try {
      const findBook = await this.bookRepository.findOne({
        where: { id }
      })
      const findBookExisted = !!head([findBook])

      if(!findBookExisted) {
        throw new HttpException('Book not found!', HttpStatus.BAD_REQUEST)
      }

      return await this.bookRepository.remove(findBook);
    } catch (error) {
      GenerateException(error)
    }
  }
}
