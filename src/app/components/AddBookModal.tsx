"use client";
import { Modal, Box, Typography, Stack, TextField, Button } from "@mui/material";
import { Book } from "../../types/book";

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  newBook: Partial<Book>;
  onNewBookChange: (updates: Partial<Book>) => void;
  onSubmit: () => void;
}

export default function AddBookModal({ 
  open, 
  onClose, 
  newBook, 
  onNewBookChange, 
  onSubmit 
}: AddBookModalProps) {
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
          ➕ เพิ่มหนังสือใหม่สู่ชั้นวาง
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="ชื่อหนังสือ"
            value={newBook.title || ""}
            onChange={(e) => onNewBookChange({ title: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="ผู้แต่ง"
            value={newBook.author || ""}
            onChange={(e) => onNewBookChange({ author: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="รายละเอียด"
            multiline
            rows={3}
            value={newBook.description || ""}
            onChange={(e) => onNewBookChange({ description: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="ประเภท (เช่น นวนิยาย, วิทยาศาสตร์)"
            value={newBook.genre || ""}
            onChange={(e) => onNewBookChange({ genre: e.target.value })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="ปีที่พิมพ์"
            type="number"
            value={newBook.year || 2024}
            onChange={(e) => onNewBookChange({ year: Number(e.target.value) })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
          />
          <TextField
            label="ราคา (บาท)"
            type="number"
            step="0.01"
            value={newBook.price || 0}
            onChange={(e) => onNewBookChange({ price: Number(e.target.value) })}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", background: "white" } }}
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
              บันทึกหนังสือ
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