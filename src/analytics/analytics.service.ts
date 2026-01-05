import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Analytics } from "./analytics.schema";

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name) private model: Model<Analytics>,
  ) {}

  findAll() {
    return this.model.find().sort({ createdAt: -1 });
  }

  findByPage(page: string) {
    return this.model.find({ page }).sort({ createdAt: -1 });
  }

  create(data: any) {
    return this.model.create(data);
  }

  getStats() {
    return this.model.aggregate([
      {
        $group: {
          _id: "$page",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
  }
}