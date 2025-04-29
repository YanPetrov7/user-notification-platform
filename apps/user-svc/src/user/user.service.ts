import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isUserExist = await this.userRepository.existsBy({
      username: createUserDto.username,
    });

    if (isUserExist) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `User with username ${createUserDto.username} already exists`,
      });
    }

    const user = this.userRepository.create(createUserDto);
    const saved = await this.userRepository.save(user);

    this.logger.debug(`Created user with id ${saved.id}`);

    return saved;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User with id ${id} not found`,
      });
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    await this.userRepository.update(id, updateUserDto);

    const updated = { ...user, ...updateUserDto };

    this.logger.debug(`Updated user with id ${id}`);

    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User with id ${id} not found`,
      });
    }

    this.logger.debug(`Deleted user with id ${id}`);
  }
}
