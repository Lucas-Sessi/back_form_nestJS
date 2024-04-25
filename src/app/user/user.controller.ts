import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/exceptions/httpExceptionFilter';
import { createApiDecorator, deleteApiDecorator, findApiDecorator, listApiDecorator, updateApiDecorator } from '../../services/swagger/docs';
import { CreateUserDtoInput } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@UseFilters(new HttpExceptionFilter())
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @createApiDecorator(CreateUserDtoInput, UserEntity)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDtoInput) {
    return this.userService.create(createUserDto);
  }

  @listApiDecorator(UserEntity)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @findApiDecorator(UserEntity)
  @HttpCode(HttpStatus.OK)
  @Get('/find/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @updateApiDecorator(CreateUserDtoInput, UserEntity)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @deleteApiDecorator()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
