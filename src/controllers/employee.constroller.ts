import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { CreateEmployeeBody } from 'src/dtos/create-employee-body';
import { hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import 'dotenv';
// import { AuthGuard } from 'src/services/auth.guard';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  // @UseGuards(AuthGuard)
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
}
