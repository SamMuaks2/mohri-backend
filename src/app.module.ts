// import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
// import { ConfigModule } from "@nestjs/config";
// import { AuthModule } from "./auth/auth.module";
// import { ProjectsModule } from "./projects/projects.module";
// import { ArticlesModule } from "./articles/articles.module";
// import { ExperienceModule } from "./experience/experience.module";
// import { CertificationsModule } from "./certifications/certifications.module";
// import { MessagesModule } from "./messages/messages.module";
// import { AnalyticsModule } from "./analytics/analytics.module";

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: '.env',
//     }),
//     MongooseModule.forRootAsync({
//       useFactory: () => {
//         const uri = process.env.MONGO_URI;
        
//         if (!uri) {
//           console.error('❌ MONGO_URI is not defined in .env file!');
//           throw new Error('MONGO_URI environment variable is required');
//         }
        
//         console.log('🔗 Connecting to MongoDB...');
//         console.log('📍 URI:', uri.substring(0, 20) + '...');
        
//         return {
//           uri,
//           retryAttempts: 3,
//           retryDelay: 1000,
//           connectionFactory: (connection) => {
//             connection.on('connected', () => {
//               console.log('✅ MongoDB connected successfully');
//             });
//             connection.on('error', (error) => {
//               console.error('❌ MongoDB connection error:', error.message);
//             });
//             connection.on('disconnected', () => {
//               console.log('⚠️  MongoDB disconnected');
//             });
//             return connection;
//           },
//         };
//       },
//     }),
//     AuthModule,
//     ProjectsModule,
//     ArticlesModule,
//     ExperienceModule,
//     CertificationsModule,
//     MessagesModule,
//     AnalyticsModule,
//   ],
// })
// export class AppModule {}


import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ProjectsModule } from "./projects/projects.module";
import { ArticlesModule } from "./articles/articles.module";
import { ExperienceModule } from "./experience/experience.module";
import { CertificationsModule } from "./certifications/certifications.module";
import { MessagesModule } from "./messages/messages.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { SettingsModule } from "./settings/settings.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
          console.error('❌ MONGO_URI is not defined in .env file!');
          throw new Error('MONGO_URI environment variable is required');
        }
        
        console.log('🔗 Connecting to MongoDB...');
        console.log('📍 URI:', uri.substring(0, 20) + '...');
        
        return {
          uri,
          retryAttempts: 3,
          retryDelay: 1000,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              console.log('✅ MongoDB connected successfully');
            });
            connection.on('error', (error) => {
              console.error('❌ MongoDB connection error:', error.message);
            });
            connection.on('disconnected', () => {
              console.log('⚠️  MongoDB disconnected');
            });
            return connection;
          },
        };
      },
    }),
    AuthModule,
    ProjectsModule,
    ArticlesModule,
    ExperienceModule,
    CertificationsModule,
    MessagesModule,
    AnalyticsModule,
    SettingsModule,
  ],
})
export class AppModule {}