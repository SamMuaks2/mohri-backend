import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    // TEMP: Replace with DB user lookup
    if (email !== "admin@portfolio.com") throw new Error("Invalid user");

    const payload = { email, role: "SUPER_ADMIN" };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
