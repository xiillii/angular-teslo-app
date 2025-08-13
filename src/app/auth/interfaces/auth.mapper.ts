import { LoginDto } from './login.dto';
import { LoginResponse } from './login.response.interface';
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

  static toLoginDto(loginResponse: LoginResponse): LoginDto {
    return {
      user: AuthMapper.toUserDto(loginResponse.user),
      token: loginResponse.token,
    };
  }
}
