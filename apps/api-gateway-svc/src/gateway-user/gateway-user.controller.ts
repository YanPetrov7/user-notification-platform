import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GatewayUserService } from './gateway-user.service';
import { lastValueFrom, Observable } from 'rxjs';

@Controller('gateway-user')
export class GatewayUserController {
  constructor(private readonly gatewayUserService: GatewayUserService) {}

  @Post()
  async createUser(@Body() data: object): Promise<object> {
    return await this.exec(this.gatewayUserService.create(data));
  }

  @Get()
  async findAllUsers(): Promise<object> {
    return await this.exec(this.gatewayUserService.findAll());
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<object> {
    const userId = Number(id);

    return await this.exec(this.gatewayUserService.find(userId));
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: object,
  ): Promise<object> {
    const userId = Number(id);

    return await this.exec(this.gatewayUserService.update(userId, data));
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<object> {
    const userId = Number(id);

    return await this.exec(this.gatewayUserService.remove(userId));
  }

  private async exec<T>(obs: Observable<T>): Promise<T> {
    try {
      return await lastValueFrom(obs);
    } catch (e: unknown) {
      if (e instanceof HttpException) {
        throw e;
      }
      if (e instanceof Error) {
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      throw new HttpException(
        'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
