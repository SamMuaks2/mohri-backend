import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message } from "./messages.schema";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private model: Model<Message>,
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

  markAsRead(id: string) {
    return this.model.findByIdAndUpdate(id, { read: true }, { new: true });
  }
}