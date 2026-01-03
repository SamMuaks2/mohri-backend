import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "./projects.schema";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private model: Model<Project>,
  ) {}

  findAll() {
    return this.model.find();
  }

  create(data: any) {
    return this.model.create(data);
  }
}
