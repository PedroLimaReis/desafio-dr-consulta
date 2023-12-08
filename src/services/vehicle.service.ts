import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async create(newVehicle: VehicleEntity): Promise<VehicleEntity> {
    return this.vehicleRepository.save(newVehicle);
  }

  findAll(): Promise<VehicleEntity[]> {
    return this.vehicleRepository.find();
  }

  findOneByPlate(plate: string): Promise<VehicleEntity | null> {
    return this.vehicleRepository.findOneBy({ plate });
  }

  async updateOne(newVehicle: VehicleEntity): Promise<VehicleEntity> {
    return this.vehicleRepository.save({ id: newVehicle.id, ...newVehicle });
  }

  async remove(id: string): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
