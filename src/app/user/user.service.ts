import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { head } from 'lodash';
import { GenerateException } from 'src/utils/exceptions/generateExceptionError';
import { Repository } from 'typeorm';
import { CreateUserDtoInput } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(data: CreateUserDtoInput): Promise<UserEntity> {
    try {
      const userExisted = await this.userRepository.findOne({
        where: { email: data.email }
      })

      if(userExisted) {
        throw new HttpException('Usuário já existe!', HttpStatus.CONFLICT)
      }

      const user = this.userRepository.create(data)

      return await this.userRepository.save(user);
    } catch (error) {
      GenerateException(error)
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const findAllUser = await this.userRepository.find();
      const findAllUserExisted = !!head(findAllUser)

      if(!findAllUserExisted) {
        throw new HttpException('Usuários não encontrados!', HttpStatus.BAD_REQUEST)
      }

      return findAllUser;
    } catch (error) {
      GenerateException(error)
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      const findOneUser = await this.userRepository.findOne({
        where: { id }
      });
      const findOneUserExisted = !!head([findOneUser])

      if(!findOneUserExisted) {
        throw new HttpException('Usuário não encontrado!', HttpStatus.BAD_REQUEST)
      }

      return findOneUser;
    } catch (error) {
      GenerateException(error)
    }
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.preload({
        ...data,
        id,
      })

      if(!user) {
        throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)
      }

      return await this.userRepository.save(user);
    } catch (error) {
      GenerateException(error)
    }
  }

  async delete(id: number): Promise<UserEntity> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { id }
      })

      if(!findUser) {
        throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND)
      }

      return await this.userRepository.remove(findUser);
    } catch (error) {
      GenerateException(error)
    }
  }
}
