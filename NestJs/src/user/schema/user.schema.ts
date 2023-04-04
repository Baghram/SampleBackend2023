import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { UserInterface } from '../interface/user.interface';

@Schema({
  collection: 'user',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class User implements UserInterface {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}

export const userSchema = SchemaFactory.createForClass(User);
