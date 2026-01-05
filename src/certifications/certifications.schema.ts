import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Certification extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) issuer: string;
  @Prop({ required: true }) issueDate: Date;
  @Prop() expiryDate: Date;
  @Prop() credentialId: string;
  @Prop() credentialUrl: string;
  @Prop() description: string;
}

export const CertificationSchema = SchemaFactory.createForClass(Certification);