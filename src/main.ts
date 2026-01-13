// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
// import { ValidationPipe } from "@nestjs/common";
// import cookieParser from "cookie-parser";
// import { EmailService } from "./email/email.service";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Getting frontend URL from environment or use default
//   const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  
//   console.log('🌐 CORS enabled for:', frontendUrl);
//   console.log('🔒 NODE_ENV:', process.env.NODE_ENV);

//   // Enabling CORS with specific origin (not wildcard) for credentials
//   app.enableCors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         "http://localhost:3000", 
//         "http://localhost:3001",
//         "https://mohri-frontend.vercel.app",
//         frontendUrl,
//         "https://mohri-admin.vercel.app"
//       ].filter(Boolean);
      
//       console.log('🔍 Request from origin:', origin);
      
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.warn('⚠️ Origin not allowed:', origin);
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//   });

//   // Enabling cookie parser
//   app.use(cookieParser());

//   // Enabling global validation pipes
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     })
//   );

//   // Swagger API Documentation
//   const config = new DocumentBuilder()
//     .setTitle("Portfolio API")
//     .setDescription("Admin & Portfolio Backend API with Gmail Integration")
//     .setVersion("1.0")
//     .addBearerAuth()
//     .addTag('auth', 'Authentication endpoints')
//     .addTag('messages', 'Message management endpoints')
//     .addTag('email', 'Email sending endpoints')
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup("docs", app, document);

//   // Testing Gmail connection on startup
//   try {
//     const emailService = app.get(EmailService);
//     const isConnected = await emailService.verifyConnection();
    
//     if (isConnected) {
//       console.log('✅ Gmail SMTP connection successful');
//       console.log(`📧 Emails will be sent from: ${process.env.GMAIL_USER}`);
//     } else {
//       console.warn('⚠️ Gmail SMTP connection failed - check your credentials');
//     }
//   } catch (error) {
//     console.error('❌ Email service initialization error:', error.message);
//     console.warn('⚠️ Application will start but email functionality may not work');
//   }

//   const port = process.env.PORT || 4000;
//   await app.listen(port);
  
//   console.log('');
//   console.log('='.repeat(60));
//   console.log(`🚀 Application is running on: http://localhost:${port}`);
//   console.log(`📚 API Documentation available at: http://localhost:${port}/docs`);
//   console.log(`🔐 JWT Authentication enabled`);
//   console.log(`📨 Email service: ${process.env.GMAIL_USER ? 'Configured' : 'Not configured'}`);
//   console.log('='.repeat(60));
//   console.log('');
// }

// bootstrap().catch((error) => {
//   console.error('❌ Application failed to start:', error);
//   process.exit(1);
// });



import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { EmailService } from "./email/email.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Getting frontend URL from environment or use default
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  
  console.log('🌐 CORS enabled for:', frontendUrl);
  console.log('🔐 NODE_ENV:', process.env.NODE_ENV);

  // Enabling CORS with specific origin (not wildcard) for credentials
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", 
        "http://localhost:3001",
        "https://mohri-frontend.vercel.app",
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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  });

  // Enabling cookie parser
  app.use(cookieParser());

  // Enabling global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle("Portfolio API")
    .setDescription("Admin & Portfolio Backend API with Resend Integration")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('messages', 'Message management endpoints')
    .addTag('email', 'Email sending endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // Testing Resend configuration on startup
  try {
    const emailService = app.get(EmailService);
    const isConnected = await emailService.verifyConnection();
    
    if (isConnected) {
      console.log('✅ Resend API configured successfully');
      console.log(`📧 Emails will be sent from: ${process.env.RESEND_FROM_EMAIL}`);
    } else {
      console.warn('⚠️ Resend API configuration failed - check your API key');
    }
  } catch (error) {
    console.error('❌ Email service initialization error:', error.message);
    console.warn('⚠️ Application will start but email functionality may not work');
  }

  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  console.log('');
  console.log('='.repeat(60));
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation available at: http://localhost:${port}/docs`);
  console.log(`🔐 JWT Authentication enabled`);
  console.log(`📨 Email service: ${process.env.RESEND_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log('='.repeat(60));
  console.log('');
}

bootstrap().catch((error) => {
  console.error('❌ Application failed to start:', error);
  process.exit(1);
});