// import { Controller, Post, Body, Get, UseGuards, Request, Res } from "@nestjs/common";
// import express from "express";
// import { AuthService } from "./auth.service";
// import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

// @Controller("auth")
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post("register")
//   async register(
//     @Body() body: { email: string; password: string; name: string },
//     @Res({ passthrough: true }) res: express.Response
//   ) {
//     const result = await this.authService.register(
//       body.email, 
//       body.password, 
//       body.name
//     );
    
//     // Setting HTTP-only cookie
//     res.cookie("token", result.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       path: "/",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });
    
//     return result;
//   }

//   @Post("login")
//   async login(
//     @Body() body: { email: string; password: string },
//     @Res({ passthrough: true }) res: express.Response
//   ) {
//     console.log("🔐 Login attempt for:", body.email);
//     const result = await this.authService.login(body.email, body.password);
    
//     console.log("🍪 Setting cookie with token (length):", result.access_token.length);
    
//     // Setting HTTP-only cookie
//     res.cookie("token", result.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       // secure: false, // false for local development
//       sameSite: "lax",
//       path: "/",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });
    
//     console.log("✅ Cookie set successfully");
    
//     return result;
//   }

//   @Post("logout")
//   async logout(@Res({ passthrough: true }) res: express.Response) {
//     res.cookie("token", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       path: "/",
//       maxAge: 0,
//     });
    
//     return { message: "Logged out successfully" };
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get("profile")
//   getProfile(@Request() req: any) {
//     return req.user;
//   }

//   @Get("check")
//   @UseGuards(JwtAuthGuard)
//   checkAuth(@Request() req: any) {
//     return { 
//       authenticated: true,
//       user: req.user 
//     };
//   }
// }



import { Controller, Post, Body, Get, UseGuards, Request, Res } from "@nestjs/common";
import express from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(
    @Body() body: { email: string; password: string; name: string },
    @Res({ passthrough: true }) res: express.Response
  ) {
    const result = await this.authService.register(
      body.email, 
      body.password, 
      body.name
    );
    
    // Set HTTP-only cookie
    res.cookie("token", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return result;
  }

  @Post("login")
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: express.Response
  ) {
    console.log("🔐 Login attempt for:", body.email);
    const result = await this.authService.login(body.email, body.password);
    
    console.log("🍪 Setting cookie with token (length):", result.access_token.length);
    
    // Set HTTP-only cookie
    res.cookie("token", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    console.log("✅ Cookie set successfully");
    
    return result;
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 0,
    });
    
    return { message: "Logged out successfully" };
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get("check")
  @UseGuards(JwtAuthGuard)
  checkAuth(@Request() req: any) {
    return { 
      authenticated: true,
      user: req.user 
    };
  }
}