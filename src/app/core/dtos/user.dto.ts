import { Role } from '@core/types/roles.type';

export interface UserDto {
  id: string;
  photo: string;
  names: string;
  about: string;
  rating: string;
  numberWhatsapp: string;
  createdAt: string;
  roles: Role[];
  username: string;
}
