import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Certification } from "./certifications.schema";

@Injectable()
export class CertificationsService {
  constructor(
    @InjectModel(Certification.name) private model: Model<Certification>,
  ) {}

  findAll() {
    return this.model.find().sort({ issueDate: -1 });
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