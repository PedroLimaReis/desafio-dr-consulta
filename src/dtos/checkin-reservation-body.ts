import { IsNotEmpty } from 'class-validator';
import { EstablishmentEntity } from 'src/entities/establishment.entity';
import { VehicleEntity } from 'src/entities/vehicle.entity';

export class CreateCheckInOrCheckOutReservationBody {
  @IsNotEmpty()
  fkVehicle: VehicleEntity;

  @IsNotEmpty()
  fkEstablishment: EstablishmentEntity;
}
