"use client";
import { Card, CardContent, Typography, Chip, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Book } from "../../types/book"; // Import type Book จาก types/book.ts
import Link from "next/link";
import { Fade } from "@mui/material";

interface BookCardProps {
  book: Book;
  user: any; // หรือ User type
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export default function BookCard({ book, user, onEdit, onDelete }: BookCardProps) {
  return (
    <Fade in timeout={600 + Math.random() * 400}>
      <Box>
        <Link href={`/book/${book._id}`} style={{ textDecoration: "none" }}>
          <Card
            elevation={4}
            sx={{
              borderRadius: "16px",
              cursor: "pointer",
              background: "linear-gradient(145deg, #FFF8DC 0%, #F5DEB3 100%)",
              border: "2px solid #DAA520",
              transition: "all 0.3s ease",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "#8B4513",
              },
              "&:hover": {
                transform: "translateY(-8px) rotate(1deg)",
                boxShadow: "0px 15px 35px rgba(139, 69, 19, 0.3)",
                background: "linear-gradient(145deg, #F5DEB3 0%, #FFF8DC 100%)",
              },
            }}
          >
            <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Box sx={{ mb: 1 }}>
                <Chip
                  label={book.genre}
                  size="small"
                  sx={{
                    bgcolor: "#DEB887",
                    color: "#5D4037",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    mb: 1,
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#5D4037",
                  mb: 1,
                  fontFamily: "'Georgia', serif",
                  lineHeight: 1.2,
                  flexGrow: 1,
                }}
              >
                📖 {book.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  color: "#8B4513",
                  mb: 1,
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                ✍️ โดย {book.author}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#A0522D",
                  fontSize: "0.8rem",
                }}
              >
                📅 {book.year} | 💰 {book.price} บาท
              </Typography>
            </CardContent>
          </Card>
        </Link>
        {user && (
          <Box display="flex" gap={1} mt={2} justifyContent="center">
            <Button
              size="small"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={(e) => {
                e.preventDefault();
                onEdit(book);
              }}
              sx={{
                borderColor: "#8B4513",
                color: "#8B4513",
                borderRadius: "8px",
                fontSize: "0.75rem",
                textTransform: "none",
                fontFamily: "'Georgia', serif",
              }}
            >
              แก้ไข
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                e.preventDefault();
                onDelete(book._id);
              }}
              sx={{
                borderColor: "#CD853F",
                color: "#CD853F",
                borderRadius: "8px",
                fontSize: "0.75rem",
                textTransform: "none",
                fontFamily: "'Georgia', serif",
              }}
            >
              ลบ
            </Button>
          </Box>
        )}
      </Box>
    </Fade>
  );
}