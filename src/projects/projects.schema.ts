import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop() title: string;
  @Prop() description: string;
  @Prop([String]) tech: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
