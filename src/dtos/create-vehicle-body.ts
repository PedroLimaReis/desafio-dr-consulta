import { IsNotEmpty, IsEnum } from 'class-validator';

export class VehicleCreateBody {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  plate: string;

  @IsNotEmpty()
  @IsEnum({
    carro: 'Carro',
    moto: 'Moto',
  })
  type: string;

  @IsNotEmpty()
  cnpj: string;
}
