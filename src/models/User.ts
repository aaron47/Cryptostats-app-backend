import { CoinbaseAuth } from './CoinbaseAuth.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  coinbaseAuth?: CoinbaseAuth;
}

export const UserSchema = SchemaFactory.createForClass(User);
