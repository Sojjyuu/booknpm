"use client";
import AuthService from "@/libs/AuthService";
import { useState } from "react";
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

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  // ฟังก์ชันจัดการการเปลี่ยนแปลง input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleLogin = () => {
    // ตรวจสอบข้อมูลเบื้องต้น (optional)
    if (!loginForm.email || !loginForm.password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    AuthService.Login(loginForm)
      .then(async (response) => {
        if (response.ok) {
          const res = await response.json();
          console.log(res);

          // สมมติ API ส่ง token และ user กลับมา
          // คุณอาจจะเก็บ token ใน localStorage หรือ context
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));

          // Redirect ไปหน้าแรก
          window.location.href = "/";
        } else {
          const res = await response.json();
          setError(res.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        }
      })
      .catch(() => {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" textAlign="center">
              Login Page
            </Typography>
            <Input
              placeholder="Email"
              fullWidth
              name="email"
              type="email"
              value={loginForm.email}
              onChange={handleChange}
            />
            <Input
              placeholder="Password"
              type="password"
              fullWidth
              name="password"
              value={loginForm.password}
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
          <Button variant="contained" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}