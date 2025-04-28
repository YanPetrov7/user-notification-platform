import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException): RpcException {
    return new RpcException(exception.getResponse());
  }
}
