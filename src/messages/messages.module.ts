// import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
// import { MessagesController } from "./messages.controller";
// import { MessagesService } from "./messages.service";
// import { Message, MessageSchema } from "./messages.schema";

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
//   ],
//   controllers: [MessagesController],
//   providers: [MessagesService],
// })
// export class MessagesModule {}


import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { Message, MessageSchema } from "./messages.schema";
import { EmailModule } from "../email/email.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    EmailModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}