import { RegisterForm } from "@/types/RegisterForm";

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export default class AuthService {
  static async Register(data: RegisterForm) {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  // ฟังก์ชันเข้าสู่ระบบ
  static async Login(data: LoginForm): Promise<Response> {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }
}