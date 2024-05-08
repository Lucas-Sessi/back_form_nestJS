import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createApiDecorator, deleteApiDecorator, findApiDecorator, listApiDecorator, updateApiDecorator } from 'src/services/swagger/docs';
import { HttpExceptionFilter } from 'src/utils/exceptions/httpExceptionFilter';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@UseFilters(new HttpExceptionFilter())
@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @createApiDecorator(CreateMovieDto, Movie)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @listApiDecorator(Movie)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @findApiDecorator(Movie)
  @HttpCode(HttpStatus.OK)
  @Get('/find/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @updateApiDecorator(UpdateMovieDto, Movie)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @deleteApiDecorator()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
