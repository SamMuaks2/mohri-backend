import { Controller, Get, Put, Body, UseGuards, Request } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("settings")
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private service: SettingsService) {}

  @Get("profile")
  getProfile(@Request() req: any) {
    return this.service.getProfile(req.user.userId);
  }

  @Put("profile")
  updateProfile(@Request() req: any, @Body() body: any) {
    return this.service.updateProfile(req.user.userId, body);
  }

  @Put("password")
  updatePassword(@Request() req: any, @Body() body: any) {
    return this.service.updatePassword(
      req.user.userId,
      body.currentPassword,
      body.newPassword
    );
  }

  @Get("preferences")
  getPreferences(@Request() req: any) {
    return this.service.getPreferences(req.user.userId);
  }

  @Put("preferences")
  updatePreferences(@Request() req: any, @Body() body: any) {
    return this.service.updatePreferences(req.user.userId, body);
  }
}