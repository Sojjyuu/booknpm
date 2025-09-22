"use client";
import { Grid, Typography, Divider } from "@mui/material";
import { Book } from "../../types/book"; // แก้ path ให้ถูกต้อง (ถ้าผิดให้ปรับตามโครงสร้างโฟลเดอร์)
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[]; // ตรวจสอบว่า books ไม่เป็น undefined (ถ้าเป็น ให้ default [])
  user: any; // หรือ User type จาก types/user.ts
  searchTerm: string;
  isLoading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export default function BookList({ 
  books = [], // Default empty array ถ้า props เป็น undefined
  user, 
  searchTerm, 
  isLoading, 
  onEdit, 
  onDelete 
}: BookListProps) {
  // Trim searchTerm เพื่อป้องกัน space-only search
  const trimmedSearchTerm = searchTerm.trim().toLowerCase();
  
  // Filter books based on search (เพิ่ม check book properties เพื่อป้องกัน undefined error)
  const filteredBooks = books.filter((book) => {
    if (!book || !book.title || !book.author || !book.genre) return false; // Skip invalid books
    return (
      book.title.toLowerCase().includes(trimmedSearchTerm) ||
      book.author.toLowerCase().includes(trimmedSearchTerm) ||
      book.genre.toLowerCase().includes(trimmedSearchTerm)
    );
  });

  // ถ้ากำลัง loading แสดง loading message
  if (isLoading) {
    return (
      <Typography
        sx={{
          fontSize: "1.3rem",
          textAlign: "center",
          color: "#8B4513",
          mt: 6,
          fontWeight: 500,
          fontFamily: "'Georgia', serif",
        }}
      >
        กำลังโหลดชั้นวางหนังสือ...
      </Typography>
    );
  }

  // ถ้าไม่มีข้อมูลเลย (books.length === 0) แสดง empty state พื้นฐาน
  if (books.length === 0) {
    return (
      <>
        <Typography
          variant="h6"
          sx={{
            color: "#5D4037",
            mb: 4,
            fontSize: "1.2rem",
            textAlign: "center",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
          }}
        >
          📚 ชั้นวางหนังสือของเรา: สำรวจคอลเลกชันที่คัดสรรมาอย่างดี
        </Typography>
        <Divider sx={{ mb: 4, borderColor: "#D2B48C", height: 2 }} />
        <Typography
          sx={{
            textAlign: "center",
            mt: 6,
            color: "#8B4513",
            fontSize: "1.1rem",
            fontStyle: "italic",
            fontFamily: "'Georgia', serif",
          }}
        >
          ยังไม่มีหนังสือในชั้นวาง... ลองเพิ่มหนังสือใหม่ดูสิ!
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          color: "#5D4037",
          mb: 4,
          fontSize: "1.2rem",
          textAlign: "center",
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
        }}
      >
        📚 ชั้นวางหนังสือของเรา: สำรวจคอลเลกชันที่คัดสรรมาอย่างดี
      </Typography>
      <Divider sx={{ mb: 4, borderColor: "#D2B48C", height: 2 }} />

      {/* Render Grid เฉพาะเมื่อมี filteredBooks เพื่อป้องกัน empty map */}
      {filteredBooks.length > 0 ? (
        <Grid container spacing={3}>
          {filteredBooks.map((book, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={book._id || `book-${index}`} // Fallback key ถ้า _id เป็น null/undefined
            >
              <BookCard
                book={book}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            mt: 6,
            color: "#8B4513",
            fontSize: "1.1rem",
            fontStyle: "italic",
            fontFamily: "'Georgia', serif",
          }}
        >
          ไม่พบหนังสือที่ตรงกับการค้นหา... ลองค้นหาใหม่ดูสิ!
        </Typography>
      )}
    </>
  );
}