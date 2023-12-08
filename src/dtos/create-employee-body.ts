import { IsNotEmpty } from 'class-validator';

export class CreateEmployeeBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  password: string;
}
