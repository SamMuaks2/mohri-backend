import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Analytics extends Document {
  @Prop({ required: true }) page: string;
  @Prop({ required: true }) event: string;
  @Prop() userAgent: string;
  @Prop() ipAddress: string;
  @Prop() referrer: string;
  @Prop({ type: Object }) metadata: Record<string, any>;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);