import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create-user' })
  async create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'find-all-users' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @MessagePattern({ cmd: 'find-user' })
  async findOne(@Payload() id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-user' })
  async update(@Payload() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({ cmd: 'remove-user' })
  async remove(@Payload() id: number): Promise<boolean> {
    await this.userService.remove(id);

    return true;
  }
}
