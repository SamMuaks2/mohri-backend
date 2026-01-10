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
    return this.model.find().sort({ createdAt: -1 });
  }

  findOne(id: string) {
    return this.model.findById(id);
  }

  create(data: any) {
    return this.model.create(data);
  }

  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}