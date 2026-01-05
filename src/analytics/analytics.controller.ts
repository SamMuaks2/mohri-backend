import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller("analytics")
export class AnalyticsController {
  constructor(private service: AnalyticsService) {}

  @Post()
  track(@Body() body: any) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN")
  @Get()
  getAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN")
  @Get("stats")
  getStats() {
    return this.service.getStats();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN")
  @Get("page/:page")
  getByPage(@Param("page") page: string) {
    return this.service.findByPage(page);
  }
}