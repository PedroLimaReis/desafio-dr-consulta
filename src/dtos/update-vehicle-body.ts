import { IsEnum } from 'class-validator';

export class UpdateVehicleBody {
  brand: string;

  model: string;

  color: string;

  plate: string;

  @IsEnum({
    carro: 'Carro',
    moto: 'Moto',
  })
  type: string;

  fk_establishment: string;
}
