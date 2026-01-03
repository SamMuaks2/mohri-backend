import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller("projects")
export class ProjectsController {
  constructor(private service: ProjectsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN")
  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }
}
