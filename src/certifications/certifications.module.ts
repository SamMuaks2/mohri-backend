import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CertificationsController } from "./certifications.controller";
import { CertificationsService } from "./certifications.service";
import { Certification, CertificationSchema } from "./certifications.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Certification.name, schema: CertificationSchema }]),
  ],
  controllers: [CertificationsController],
  providers: [CertificationsService],
})
export class CertificationsModule {}