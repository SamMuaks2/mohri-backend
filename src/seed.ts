import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { User } from "./auth/user.schema";

async function bootstrap() {
  console.log("🌱 Starting database seed...\n");
  
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const userModel = app.get<Model<User>>(getModelToken(User.name));

    // Check if super admin already exists
    const existingSuperAdmin = await userModel.findOne({ role: "SUPER_ADMIN" });

    if (existingSuperAdmin) {
      console.log("⚠️  Super admin user already exists:");
      console.log(`   Email: ${existingSuperAdmin.email}`);
      console.log(`   Name: ${existingSuperAdmin.name}`);
      console.log("\n✅ Seed script completed (no changes made)");
      await app.close();
      return;
    }

    // Create super admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const superAdmin = await userModel.create({
      email: "admin@mohri.com",
      password: hashedPassword,
      name: "Super Admin",
      role: "SUPER_ADMIN",
      active: true,
    });

    console.log("✅ Super admin user created successfully!");
    console.log("\n📋 Login credentials:");
    console.log("   Email: admin@mohri.com");
    console.log("   Password: admin123");
    console.log("\n⚠️  IMPORTANT: Please change this password after first login!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }

  await app.close();
  process.exit(0);
}

bootstrap();