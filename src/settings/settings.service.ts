import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User } from "../auth/user.schema";

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select("-password");
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return user;
  }

  async updateProfile(userId: string, data: any) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    // Update allowed fields
    if (data.name) user.name = data.name;
    if (data.email) {
      // Check if email is already taken by another user
      const existingUser = await this.userModel.findOne({ 
        email: data.email,
        _id: { $ne: userId }
      });
      if (existingUser) {
        throw new BadRequestException("Email already in use");
      }
      user.email = data.email;
    }

    await user.save();
    
    // Return user without password
    return this.userModel.findById(userId).select("-password");
  }

  async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    // Validate new password
    if (newPassword.length < 6) {
      throw new BadRequestException("New password must be at least 6 characters long");
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: "Password updated successfully" };
  }

  async getPreferences(userId: string) {
    const user = await this.userModel.findById(userId).select("preferences");
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    
    // Return default preferences if not set
    return (user as any).preferences || {
      theme: "dark",
      accentColor: "#d4af37",
      emailNotifications: true,
      commentNotifications: true,
      weeklySummary: true,
      marketingEmails: false,
      systemAlerts: true,
    };
  }

  async updatePreferences(userId: string, preferences: any) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    (user as any).preferences = {
      ...(user as any).preferences,
      ...preferences,
    };

    await user.save();
    return (user as any).preferences;
  }
}