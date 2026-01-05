import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Experience } from "./experience.schema";

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name) private model: Model<Experience>,
  ) {}

  findAll() {
    return this.model.find().sort({ startDate: -1 });
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