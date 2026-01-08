// // import { Injectable, UnauthorizedException } from "@nestjs/common";
// // import { PassportStrategy } from "@nestjs/passport";
// // import { ExtractJwt, Strategy } from "passport-jwt";

// // @Injectable()
// // export class JwtStrategy extends PassportStrategy(Strategy) {
// //   constructor() {
// //     super({
// //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// //       ignoreExpiration: false,
// //       secretOrKey: process.env.JWT_SECRET || "your-secret-key",
// //     });
// //   }

// //   async validate(payload: any) {
// //     if (!payload) {
// //       throw new UnauthorizedException();
// //     }
// //     return { 
// //       userId: payload.sub, 
// //       email: payload.email, 
// //       role: payload.role 
// //     };
// //   }
// // }


// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { User } from "./user.schema";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<User>
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET || "your-secret-key",
//     });
//   }

//   async validate(payload: any) {
//     if (!payload) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     // Verify user still exists and is active
//     const user = await this.userModel.findById(payload.sub).select('-password');
    
//     if (!user) {
//       throw new UnauthorizedException('User not found');
//     }

//     if (!user.active) {
//       throw new UnauthorizedException('Account is inactive');
//     }
    
//     return { 
//       userId: payload.sub, 
//       email: payload.email, 
//       role: payload.role 
//     };
//   }
// }



import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Request } from "express";
import { User } from "./user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Try cookie first
        (request: Request) => {
          return request?.cookies?.token;
        },
        // Fallback to Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "your-secret-key",
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    // Verify user still exists and is active
    const user = await this.userModel.findById(payload.sub).select('-password');
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.active) {
      throw new UnauthorizedException('Account is inactive');
    }
    
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}