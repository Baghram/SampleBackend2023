import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import {
  IsOptional,
  ValidateNested,
} from 'class-validator/types/decorator/decorators';
import { Profile, UserInterface } from '../interface/user.interface';

class ProfileDto implements Profile {
  @IsString()
  name: string;

  @IsString()
  address: string;
}

export class UserDto implements UserInterface {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile?: Profile;

  @IsOptional()
  @IsString()
  registerType?: string;
}
