import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) content: string;
  @Prop() excerpt: string;
  @Prop([String]) tags: string[];
  @Prop({ default: false }) published: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);