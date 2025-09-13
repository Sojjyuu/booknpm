"use client";
import { Book } from "@/types/book";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  CardMedia,
  Grid,
  Rating,
  Divider,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // สมมติเพิ่ม rating และ reviews (ถ้าไม่มีใน API จริงให้ลบออก)
  const [rating, setRating] = useState(4.2);
  const [reviewsCount, setReviewsCount] = useState(128);

  useEffect(() => {
    const fetchData = async () => {
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
    };
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          ❌ ไม่พบข้อมูลหนังสือ
        </Typography>
        <Link href="/" passHref>
          <Button variant="outlined" sx={{ mt: 2 }}>
            ⬅️ กลับไปหน้ารายการ
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          boxShadow: 6,
          overflow: "hidden",
          bgcolor: "#fafafa",
        }}
      >
        {/* รูปปกหนังสือ */}
        {book.coverImage && (
          <CardMedia
            component="img"
            image={book.coverImage}
            alt={book.title}
            sx={{
              width: { xs: "100%", md: 350 },
              height: { xs: 400, md: "auto" },
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        )}

        <CardContent sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#2c3e50" }}
          >
            {book.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              gap: 1,
            }}
          >
            <Rating
              name="book-rating"
              value={rating}
              precision={0.1}
              readOnly
              size="medium"
            />
            <Typography variant="body2" color="text.secondary">
              ({reviewsCount} รีวิว)
            </Typography>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            ✍️ ผู้แต่ง: <strong>{book.author}</strong>
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            🏢 สำนักพิมพ์: {book.publisher}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            📅 ปีที่พิมพ์: {book.year}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            📖 รายละเอียดหนังสือ
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", mb: 4 }}
          >
            {book.description}
          </Typography>

          {/* ปุ่มซื้อหนังสือ */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ flexGrow: 1, maxWidth: 200 }}
              onClick={() => alert("เพิ่มสินค้าลงตะกร้า (สมมติ)")}
            >
              🛒 ซื้อหนังสือ
            </Button>

            <Link href="/" passHref>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ flexGrow: 1, maxWidth: 200 }}
              >
                ⬅️ กลับไปหน้ารายการ
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}