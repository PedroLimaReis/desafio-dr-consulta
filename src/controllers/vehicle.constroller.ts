import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { VehicleEntity } from '../entities/vehicle.entity';
import { VehicleCreateBody } from 'src/dtos/create-vehicle-body';
import { UpdateVehicleBody } from 'src/dtos/update-vehicle-body';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async createdVehicle(
    @Body() body: VehicleCreateBody,
  ): Promise<VehicleEntity> {
    const { brand, model, color, plate, type } = body;

    const vehicle = await this.vehicleService.findOneByPlate(plate);

    if (vehicle) {
      return vehicle;
    }

    const newVehicle = await this.vehicleService.create({
      brand,
      model,
      color,
      plate,
      type,
    });

    return newVehicle;
  }

  @Get()
  async getAllVehicle(): Promise<VehicleEntity[]> {
    const vehicles = await this.vehicleService.findAll();

    return vehicles;
  }

  @Get(':id')
  async getOneVehicle(@Param('id') plate: string): Promise<VehicleEntity> {
    const vehicles = await this.vehicleService.findOneByPlate(plate);

    return vehicles;
  }

  @Put(':id')
  async updateVehicle(
    @Body() body: UpdateVehicleBody,
    @Param('id') id: string,
  ): Promise<void> {
    const vehicle = body;

    if (vehicle.plate) {
      const vehicleExist = await this.vehicleService.findOneByPlate(
        vehicle.plate,
      );

      if (vehicleExist) {
        throw new Error('Placa ja cadastrada no sistema');
      }
    }

    await this.vehicleService.updateOne({ id, ...vehicle });

    return;
  }

  @Delete(':id')
  async deleteVehicle(@Param('id') id: string): Promise<void> {
    await this.vehicleService.remove(id);

    return;
  }
}
