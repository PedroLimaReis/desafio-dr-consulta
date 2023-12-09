import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { compareSync } from 'bcrypt';
import { LoginEmployeeBody } from 'src/dtos/login-employee-body';
import { JwtService } from '@nestjs/jwt';
import 'dotenv';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

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

  async checkToken(token: string) {
    try {
      return this.jwtService.verify(token.replace('Bearer ', ''));
    } catch (err) {
      return false;
    }
  }
}
