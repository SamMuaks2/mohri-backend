import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) email: string;
  @Prop() subject: string;
  @Prop({ required: true }) message: string;
  @Prop({ default: false }) read: boolean;
  @Prop({ default: false }) replied: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);