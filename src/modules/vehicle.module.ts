import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from '../services/vehicle.service';
import { VehicleController } from '../controllers/vehicle.constroller';
import { VehicleEntity } from '../entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
