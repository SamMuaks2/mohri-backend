import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message } from "./messages.schema";
import { EmailService } from "../email/email.service";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private model: Model<Message>,
    private emailService: EmailService,
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

  async sendReply(id: string, replyMessage: string) {
    const message = await this.model.findById(id);
    if (!message) {
      throw new Error('Message not found');
    }

    await this.emailService.sendReply(
      message.email,
      message.subject || 'Your Message',
      replyMessage,
      message.message
    );

    // Mark as replied
    return this.model.findByIdAndUpdate(
      id,
      { replied: true, read: true },
      { new: true }
    );
  }
}