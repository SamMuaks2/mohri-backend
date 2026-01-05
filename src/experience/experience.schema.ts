import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Experience extends Document {
  @Prop({ required: true }) company: string;
  @Prop({ required: true }) position: string;
  @Prop({ required: true }) startDate: Date;
  @Prop() endDate: Date;
  @Prop() description: string;
  @Prop([String]) responsibilities: string[];
  @Prop([String]) technologies: string[];
  @Prop({ default: false }) current: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);