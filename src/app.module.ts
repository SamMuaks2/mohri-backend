import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { ProjectsModule } from "./projects/projects.module";
import { ArticlesModule } from "./articles/articles.module";
import { ExperienceModule } from "./experience/experience.module";
import { CertificationsModule } from "./certifications/certifications.module";
import { MessagesModule } from "./messages/messages.module";
import { AnalyticsModule } from "./analytics/analytics.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb://localhost:27017/mohri"),
    AuthModule,
    ProjectsModule,
    ArticlesModule,
    ExperienceModule,
    CertificationsModule,
    MessagesModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
