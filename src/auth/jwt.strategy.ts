import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { Request } from "express";
import { User } from "./user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService
  ) {
    const secret = configService.get<string>('JWT_SECRET') || 'your-secret-key';
    console.log('🔑 JWT Strategy - Using secret (first 10 chars):', secret.substring(0, 10) + '...');
    
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1. Trying Authorization header first (most common)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // 2. Fallback to cookie
        (request: Request) => {
          const token = request?.cookies?.token;
          console.log("🔑 JWT Strategy - Cookie token:", token ? "Found" : "Not found");
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: false,
    });
  }

  async validate(payload: any) {
    console.log("🔐 JWT validate called with payload:", payload);
    
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    // Verifying user still exists and is active
    const user = await this.userModel.findById(payload.sub).select('-password');
    
    if (!user) {
      console.log("❌ User not found:", payload.sub);
      throw new UnauthorizedException('User not found');
    }

    if (!user.active) {
      console.log("❌ User inactive:", payload.sub);
      throw new UnauthorizedException('Account is inactive');
    }
    
    console.log("✅ JWT validation successful for user:", user.email);
    
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}