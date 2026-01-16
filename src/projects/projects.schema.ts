import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Interface for project links
export interface ProjectLink {
  label: string;
  url: string;  
}

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop([String]) tech: string[];
  
  // Project links
  @Prop({ 
    type: [{ 
      label: { type: String, required: true },
      url: { type: String, required: true }
    }],
    default: [] 
  })
  links: ProjectLink[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);