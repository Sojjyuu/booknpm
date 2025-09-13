"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  CardMedia,
  Box,
  Stack,
  Rating,
} from "@mui/material";
import type { BookResponse, Book } from "../types/book";
import Link from "next/link";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/books");
      if (response.ok) {
        const data = await response.json();
        const resData: BookResponse = data;
        setBooksData(resData.books);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
        sx={{ mb: 4, color: "#2c3e50" }}
      >
        📚 รายการหนังสือ
      </Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {booksData.map((book) => (
            <Grid item key={book._id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-4px)",
                  },
                }}
                elevation={4}
              >
                {/* รูปปกหนังสือ */}
                {book.coverImage ? (
                  <CardMedia
                    component="img"
                    image={book.coverImage}
                    alt={book.title}
                    sx={{
                      height: 220,
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 220,
                      bgcolor: "#e0e0e0",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9e9e9e",
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    ไม่มีรูปปก
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={book.title}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={book.author}
                  >
                    ✍️ {book.author}
                  </Typography>

                  {/* สมมติแสดง rating ถ้ามี */}
                  {"rating" in book && book.rating !== undefined && (
                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                      <Rating
                        name="read-only"
                        value={book.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {book.rating.toFixed(1)}
                      </Typography>
                    </Stack>
                  )}
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Link href={`/book/${book._id}`} passHref>
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ fontWeight: "bold" }}
                    >
                      ดูรายละเอียด
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}