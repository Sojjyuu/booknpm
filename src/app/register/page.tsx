"use client";
import AuthService from "@/libs/AuthService";
import { RegisterForm } from "@/types/RegisterForm";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Input,
  Stack,
  Button,
  CardActions,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  // ฟังก์ชันจัดการการเปลี่ยนแปลง input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleRegister = () => {
    // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // สร้างข้อมูลสำหรับส่งไป API
    const data: RegisterForm = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    };

    AuthService.Register(data).then(async (response) => {
      if (response.status === 201) {
        const res = await response.json();
        console.log(res);

        // Redirect ไปหน้า login
        window.location.href = "/login";
      } else {
        // อ่านข้อความ error จาก response
        const res = await response.json();
        setError(res.message || "เกิดข้อผิดพลาดในการลงทะเบียน");
      }
    }).catch(() => {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" textAlign="center">
              Register Page
            </Typography>
            <Input
              placeholder="Username"
              fullWidth
              name="username"
              value={registerForm.username}
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              fullWidth
              name="email"
              type="email"
              value={registerForm.email}
              onChange={handleChange}
            />
            <Input
              placeholder="Password"
              type="password"
              fullWidth
              name="password"
              value={registerForm.password}
              onChange={handleChange}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              fullWidth
              name="confirmPassword"
              value={registerForm.confirmPassword}
              onChange={handleChange}
            />
            {error && (
              <FormHelperText error sx={{ textAlign: "center" }}>
                {error}
              </FormHelperText>
            )}
          </Stack>
        </CardContent>

        <CardActions>
          <Button variant="contained" fullWidth onClick={handleRegister}>
            Register
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}