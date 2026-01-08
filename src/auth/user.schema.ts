// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document } from "mongoose";

// @Schema({ timestamps: true })
// export class User extends Document {
//   @Prop({ required: true, unique: true }) email: string;
//   @Prop({ required: true }) password: string;
//   @Prop({ required: true }) name: string;
//   @Prop({ required: true, enum: ["SUPER_ADMIN", "ADMIN", "USER"], default: "USER" }) 
//   role: string;
//   @Prop({ default: true }) active: boolean;
// }

// export const UserSchema = SchemaFactory.createForClass(User);


import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true, enum: ["SUPER_ADMIN", "ADMIN", "USER"], default: "USER" }) 
  role: string;
  @Prop({ default: true }) active: boolean;
  
  // Additional profile fields
  @Prop() bio: string;
  @Prop() location: string;
  @Prop() website: string;
  @Prop() avatar: string;
  
  // User preferences
  @Prop({ 
    type: Object, 
    default: {
      theme: "dark",
      accentColor: "#d4af37",
      emailNotifications: true,
      commentNotifications: true,
      weeklySummary: true,
      marketingEmails: false,
      systemAlerts: true,
    }
  })
  preferences: {
    theme: string;
    accentColor: string;
    emailNotifications: boolean;
    commentNotifications: boolean;
    weeklySummary: boolean;
    marketingEmails: boolean;
    systemAlerts: boolean;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);