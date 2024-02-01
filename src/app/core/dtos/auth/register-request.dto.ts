import { Role } from '@core/types/roles.type';

export interface RegisterRequestDto {
  photo: string;
  names: string;
  about: string;
  rating: string;
  numberWhatsapp: string;
  roles: Array<Role>;
}