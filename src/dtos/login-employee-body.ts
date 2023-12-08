import { IsNotEmpty } from 'class-validator';

export class LoginEmployeeBody {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  password: string;
}
