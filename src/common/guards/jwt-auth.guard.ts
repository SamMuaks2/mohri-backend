import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log("🔒 JwtAuthGuard - Checking route:", request.url);
    console.log("🔒 Authorization header:", request.headers.authorization ? "Present" : "Missing");
    console.log("🔒 Cookies:", request.cookies ? Object.keys(request.cookies) : "None");
    
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      console.log("❌ JwtAuthGuard - Auth failed");
      console.log("   Error:", err);
      console.log("   Info:", info);
      throw err || new UnauthorizedException("Unauthorized access");
    }
    console.log("✅ JwtAuthGuard - Auth successful for:", user.email);
    return user;
  }
}