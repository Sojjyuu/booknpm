"use client";
import { Book } from "@/types/book";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:3000/api/books/${id}`);
          if (response.ok) {
            const data = await response.json();
            const _book: Book = data["book"];
            setBook(_book);
          }
        } catch (error) {
          console.error("Error fetching book:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fdfaf6",
        py: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 700, px: 2 }}>
        <Paper
          elevation={0}
          sx={{
            background: "#fff",
            borderRadius: "14px",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
            border: "1px solid #e8dfd3",
            p: { xs: 3, sm: 5 },
          }}
        >
          {/* Header */}
          <Box display="flex" alignItems="center" mb={3}>
            <LibraryBooksIcon sx={{ fontSize: 40, color: "#6a994e", mr: 2 }} />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#4b3f2f",
                textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              รายละเอียดหนังสือ
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, borderColor: "#e8dfd3" }} />

          {isLoading ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#6a994e", fontWeight: 500 }}
            >
              📚 กำลังโหลดข้อมูลหนังสือ...
            </Typography>
          ) : book ? (
            <Stack spacing={2}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#4b3f2f", mb: 1 }}
              >
                📖 {book.title}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label={`✍️ ผู้แต่ง: ${book.author}`}
                  size="small"
                  sx={{
                    bgcolor: "#f1f8e9",
                    color: "#2e7d32",
                    fontWeight: 500,
                  }}
                />
                {book.year && (
                  <Chip
                    label={`📅 ปีที่พิมพ์: ${book.year}`}
                    size="small"
                    sx={{
                      bgcolor: "#fff8e1",
                      color: "#f57f17",
                      fontWeight: 500,
                    }}
                  />
                )}
              </Stack>

              <Divider sx={{ my: 2, borderColor: "#f1e8da" }} />

              <Typography
                variant="body1"
                sx={{
                  color: "#4b3f2f",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {book.description || "ไม่มีคำอธิบายสำหรับหนังสือเล่มนี้"}
              </Typography>
            </Stack>
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#b71c1c" }}
            >
              ❌ ไม่พบข้อมูลหนังสือ
            </Typography>
          )}

          <Divider sx={{ mt: 3, mb: 2, borderColor: "#e8dfd3" }} />

          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={{
              borderColor: "#6a994e",
              color: "#6a994e",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": {
                borderColor: "#527c3a",
                color: "#527c3a",
                bgcolor: "#f8f5f0",
              },
            }}
          >
            ← ย้อนกลับ
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}