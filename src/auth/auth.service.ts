// import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import * as bcrypt from "bcrypt";
// import { User } from "./user.schema";

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<User>,
//     private jwtService: JwtService,
//   ) {}

//   async register(email: string, password: string, name: string) {
//     const existingUser = await this.userModel.findOne({ email });
//     if (existingUser) {
//       throw new ConflictException("User already exists");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await this.userModel.create({
//       email,
//       password: hashedPassword,
//       name,
//       role: "USER",
//     });

//     return this.generateToken(user);
//   }

//   async login(email: string, password: string) {
//     const user = await this.userModel.findOne({ email });
//     if (!user) {
//       throw new UnauthorizedException("Invalid credentials");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new UnauthorizedException("Invalid credentials");
//     }

//     if (!user.active) {
//       throw new UnauthorizedException("Account is inactive");
//     }

//     return this.generateToken(user);
//   }

//   private generateToken(user: User) {
//     const payload = { 
//       email: user.email, 
//       sub: user._id, 
//       role: user.role 
//     };
    
//     return {
//       access_token: this.jwtService.sign(payload),
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//         role: user.role,
//       },
//     };
//   }

//   async validateUser(email: string): Promise<any> {
//     return this.userModel.findOne({ email }).select("-password");
//   }
// }


import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { User } from "./user.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string, res: Response) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
      role: "USER",
    });

    return this.generateTokenAndSetCookie(user, res);
  }

  async login(email: string, password: string, res: Response) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!user.active) {
      throw new UnauthorizedException("Account is inactive");
    }

    return this.generateTokenAndSetCookie(user, res);
  }

  private generateTokenAndSetCookie(user: User, res: Response) {
    const payload = { 
      email: user.email, 
      sub: user._id, 
      role: user.role 
    };
    
    const token = this.jwtService.sign(payload);
    
    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return {
      access_token: token, // Still send in response for flexibility
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async validateUser(email: string): Promise<any> {
    return this.userModel.findOne({ email }).select("-password");
  }

  logout(res: Response) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 0,
    });
    
    return { message: "Logged out successfully" };
  }
}