import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async created(newEmployee: EmployeeEntity): Promise<EmployeeEntity> {
    return this.employeeRepository.save(newEmployee);
  }

  async getPassword(user: string): Promise<EmployeeEntity> {
    return this.employeeRepository.findOneBy({ user });
  }

  async getUser(user: string): Promise<EmployeeEntity> {
    return this.employeeRepository.findOneBy({ user });
  }
}
