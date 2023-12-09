import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from '../services/employee.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/auth.constroller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [EmployeeService],
  controllers: [AuthController],
})
export class AuthModule {}
