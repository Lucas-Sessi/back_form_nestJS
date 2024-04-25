import { PartialType } from '@nestjs/swagger';
import { CreateUserDtoInput } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDtoInput) {}
