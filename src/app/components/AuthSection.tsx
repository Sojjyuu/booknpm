"use client";
import { Button, Paper, Box, Typography, Avatar } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

interface User {
  username: string;
  email: string;
}

interface AuthSectionProps {
  user: User | null;
  onLogout: () => void;
}

export default function AuthSection({ user, onLogout }: AuthSectionProps) {
  if (!user) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          display: "flex",
          gap: 2,
          justifyContent: "center",
          borderRadius: "12px",
          bgcolor: "#FFF8DC",
          border: "1px solid #DAA520",
          boxShadow: "0px 4px 12px rgba(218, 165, 32, 0.2)",
        }}
      >
        <Button
          variant="contained"
          startIcon={<BookIcon />}
          sx={{
            bgcolor: "#8B4513",
            color: "white",
            "&:hover": { bgcolor: "#A0522D" },
            borderRadius: "8px",
            fontFamily: "'Georgia', serif",
            textTransform: "none",
            px: 3,
          }}
          component={Link}
          href="/register"
        >
          สมัครสมาชิก
        </Button>
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          sx={{
            borderColor: "#8B4513",
            color: "#8B4513",
            "&:hover": { borderColor: "#A0522D", color: "#A0522D" },
            borderRadius: "8px",
            fontFamily: "'Georgia', serif",
            textTransform: "none",
            px: 3,
          }}
          component={Link}
          href="/login"
        >
          เข้าสู่ระบบ
        </Button>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        mb: 4,
        p: 3,
        bgcolor: "#FFF8DC",
        borderRadius: "12px",
        border: "1px solid #DAA520",
        boxShadow: "0px 4px 12px rgba(218, 165, 32, 0.2)",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{
            bgcolor: "#8B4513",
            width: 50,
            height: 50,
            fontSize: "1.5rem",
          }}
        >
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "#5D4037",
              fontFamily: "'Georgia', serif",
            }}
          >
            👋 สวัสดี, {user.username}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#8B4513",
              fontStyle: "italic",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            📧 {user.email}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        sx={{
          mt: 2,
          borderColor: "#CD853F",
          color: "#CD853F",
          "&:hover": { borderColor: "#A0522D", color: "#A0522D" },
          borderRadius: "8px",
          fontFamily: "'Georgia', serif",
          textTransform: "none",
        }}
        onClick={onLogout}
      >
        ออกจากระบบ
      </Button>
    </Paper>
  );
}