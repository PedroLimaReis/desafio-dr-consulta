import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from '../services/employee.service';
import { EmployeeController } from '../controllers/employee.constroller';
import { EmployeeEntity } from '../entities/employee.entity';
import { JwtModule } from '@nestjs/jwt';
// import { AuthGuard } from '../services/auth.guard';

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
  controllers: [EmployeeController],
})
export class EmployeeModule {}
