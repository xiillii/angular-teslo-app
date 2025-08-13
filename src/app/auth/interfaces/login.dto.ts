import { UserDto } from './user.dto';

export interface LoginDto {
  user: UserDto;
  token: string;
}
