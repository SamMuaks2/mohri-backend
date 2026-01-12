// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
// import cookieParser from "cookie-parser";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Enabling CORS with specific origin (not wildcard) for credentials
//   app.enableCors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         "http://localhost:3000", 
//         "http://localhost:3001", 
//         "https://mohri-admin.vercel.app"
//       ];
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   });

//   app.use(cookieParser());

//   const config = new DocumentBuilder()
//     .setTitle("Portfolio API")
//     .setDescription("Admin & Portfolio Backend API")
//     .setVersion("1.0")
//     .addBearerAuth()
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup("docs", app, document);

//   const port = process.env.PORT || 4000;
//   await app.listen(port);
//   console.log(`🚀 Application is running on: http://localhost:${port}`);
// }
// bootstrap();


import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Getting frontend URL from environment or use default
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  
  console.log('🌐 CORS enabled for:', frontendUrl);
  console.log('🔒 NODE_ENV:', process.env.NODE_ENV);

  // Enabling CORS with specific origin (not wildcard) for credentials
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", 
        "http://localhost:3001",
        frontendUrl,
        "https://mohri-admin.vercel.app"
      ].filter(Boolean);
      
      console.log('🔍 Request from origin:', origin);
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn('⚠️ Origin not allowed:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("Portfolio API")
    .setDescription("Admin & Portfolio Backend API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();