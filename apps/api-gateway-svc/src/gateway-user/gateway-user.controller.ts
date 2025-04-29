import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { GatewayUserService } from './gateway-user.service';

@Controller('gateway-user')
export class GatewayUserController {
  constructor(private readonly service: GatewayUserService) {}

  @Post()
  async createUser(@Body() data: object): Promise<object> {
    return this.service.create(data);
  }

  @Get()
  async findAllUsers(): Promise<object[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<object> {
    return this.service.find(Number(id));
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: object,
  ): Promise<object> {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<void> {
    return this.service.remove(Number(id));
  }
}
