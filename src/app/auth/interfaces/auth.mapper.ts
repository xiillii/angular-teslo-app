import { UserDto } from './user.dto';
import { User } from './user.response.interface';

export class AuthMapper {
  static toUserDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isActive: user.isActive,
      roles: user.roles,
    };
  }
}
