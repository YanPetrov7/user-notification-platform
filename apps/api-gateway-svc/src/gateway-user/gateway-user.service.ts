import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class GatewayUserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  create(data: object): Observable<object> {
    return this.userService.send({ cmd: 'create-user' }, data);
  }

  findAll(): Observable<object> {
    return this.userService.send({ cmd: 'find-all-users' }, {});
  }

  find(id: number): Observable<object> {
    return this.userService.send({ cmd: 'find-user' }, id);
  }

  update(id: number, data: object): Observable<object> {
    const updateData = { id, ...data };

    return this.userService.send({ cmd: 'update-user' }, updateData);
  }

  remove(id: number): Observable<object> {
    return this.userService.send({ cmd: 'remove-user' }, id);
  }
}
