"use client";
import { Modal, Box, Typography, Stack, TextField, Button } from "@mui/material";
import { Book } from "@/types/book";

interface EditBookModalProps {
  open: boolean;
  onClose: () => void;
  editBook: Book | null;
  onEditBookChange: (updates: Partial<Book>) => void;
  onSubmit: () => void;
}

export default function EditBookModal({ 
  open, 
  onClose, 
  editBook, 
  onEditBookChange, 
  onSubmit 
}: EditBookModalProps) {
  if (!editBook) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: "10vh",
          bgcolor: "#FFF8DC",
          borderRadius: "16px",
          boxShadow: "0px 10px 40px rgba(139, 69, 19, 0.3)",
          p: 4,
          border: "2px solid #DAA520",
          fontFamily: "'Georgia', serif",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: "#5D4037", textAlign: "center" }}>
          ✏️ แก้ไขข้อมูลหนังสือ
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="ชื่อหนังสือ"
            value={editBook.title || ""}
            onChange={(e) => onEditBookChange({ title: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="ผู้แต่ง"
            value={editBook.author || ""}
            onChange={(e) => onEditBookChange({ author: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="รายละเอียด"
            multiline
            rows={3}
            value={editBook.description || ""}
            onChange={(e) => onEditBookChange({ description: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="ประเภท"
            value={editBook.genre || ""}
            onChange={(e) => onEditBookChange({ genre: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="ปีที่พิมพ์"
            type="number"
            value={editBook.year || 2024}
            onChange={(e) => onEditBookChange({ year: Number(e.target.value) })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="ราคา (บาท)"
            type="number"
            value={editBook.price || 0}
            onChange={(e) => onEditBookChange({ price: Number(e.target.value) })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
            inputProps={{ step: "any" }}
          />
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#8B4513",
                "&:hover": { bgcolor: "#A0522D" },
                borderRadius: "8px",
                fontFamily: "'Georgia', serif",
                textTransform: "none",
              }}
              onClick={onSubmit}
            >
              บันทึกการแก้ไข
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#CD853F",
                color: "#CD853F",
                borderRadius: "8px",
                fontFamily: "'Georgia', serif",
                textTransform: "none",
              }}
              onClick={onClose}
            >
              ยกเลิก
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}