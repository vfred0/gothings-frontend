import { UserDto } from '@core/dtos/user.dto';

export interface Session extends UserDto {
  token: string;
}
