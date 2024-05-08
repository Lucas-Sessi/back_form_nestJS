import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { head } from 'lodash';
import { GenerateException } from 'src/utils/exceptions/generateExceptionError';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async create(data: CreateMovieDto) {
    try {
      const movieExisted = await this.movieRepository.findOne({
        where: { title: data.title }
      });
      const movieExistedResult = !!head([movieExisted]);

      if(movieExistedResult) throw new HttpException('Movie Existed!', HttpStatus.CONFLICT);

      const movieCreated = this.movieRepository.create(data);

      return await this.movieRepository.save(movieCreated);
    } catch (error) {
      GenerateException(error)
    }
  }

  async findAll() {
    try {
      const result = await this.movieRepository.find();
      const resultExisted = !!head(result);

      if(!resultExisted) throw new HttpException('Movies not Existed!', HttpStatus.NO_CONTENT);

      return result;
    } catch (error) {
      GenerateException(error)
    }
  }

  async findOne(id: number) {
    try {
      const findOneMovie = await this.movieRepository.findOne({
        where: { id }
      })
      const findOneMovieExisted = !!head([findOneMovie])

      if(!findOneMovieExisted) throw new HttpException('Movie not found!', HttpStatus.NOT_FOUND)

      return findOneMovie;
    } catch (error) {
      GenerateException(error)
    }
  }

  async update(id: number, data: UpdateMovieDto) {
    try {
      const movie = await this.movieRepository.preload({
        id,
        ...data
      })

      if(!movie) throw new HttpException('Movie not found!', HttpStatus.NOT_FOUND)

      return await this.movieRepository.save(movie)
    } catch (error) {
      GenerateException(error)
    }
  }

  async remove(id: number) {
    try {
      const findMovie = await this.movieRepository.findOne({
        where: { id }
      });
      const findMovieExisted = !!head([findMovie])

      if(!findMovieExisted) throw new HttpException('Movie not found!', HttpStatus.NOT_FOUND)

      return await this.movieRepository.remove(findMovie)
    } catch (error) {
      GenerateException(error)
    }
  }
}
