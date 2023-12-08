import { IsNotEmpty } from 'class-validator';

export class CreateEstablishmentBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  spaceForMotocycles: number;

  @IsNotEmpty()
  spaceForCar: number;
}
