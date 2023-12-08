import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeBody } from 'src/dtos/create-employee-body';
import { hashSync, compareSync } from 'bcrypt';
import { LoginEmployeeBody } from 'src/dtos/login-employee-body';
import { JwtService } from '@nestjs/jwt';
import 'dotenv';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  @Post('create')
  async createEmployee(
    @Body() body: CreateEmployeeBody,
  ): Promise<EmployeeEntity> {
    const { name, password, user } = body;

    const userExist = await this.employeeService.getUser(user);

    if (userExist) {
      throw new Error('Usuário ja existe');
    }

    const hashPassword = await hashSync(password, 10);

    await this.employeeService.created({ name, password: hashPassword, user });

    return;
  }

  @Post('login')
  async loginEmployee(@Body() body: LoginEmployeeBody): Promise<any> {
    const { password, user } = body;

    const userExist = await this.employeeService.getUser(user);

    if (!userExist) {
      throw new Error('Usuário/Senha Invalido');
    }

    const comparePassword = await compareSync(password, userExist.password);

    if (comparePassword === false) {
      throw new Error('Usuário/Senha Invalido');
    }

    const payload = { sub: userExist.id, username: userExist.name };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT,
        expiresIn: '60s',
      }),
    };
  }
}
