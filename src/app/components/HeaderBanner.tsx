"use client";
import { Box, Typography } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Fade } from "@mui/material";

export default function HeaderBanner() {
  return (
    <Fade in timeout={800}>
      <Box
        sx={{
          textAlign: "center",
          mb: 5,
          pt: 4,
        }}
      >
        <LibraryBooksIcon
          sx={{
            fontSize: { xs: 48, md: 72 },
            color: "#8B4513",
            mb: 2,
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
          }}
        />
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            color: "#5D4037",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            fontFamily: "'Georgia', serif",
            mb: 1,
          }}
        >
          📚 ร้านหนังสือเก่าแก่
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#8B4513",
            fontStyle: "italic",
            fontFamily: "'Times New Roman', serif",
          }}
        >
          ค้นพบเรื่องราวที่ซ่อนอยู่ในหน้าหนังสือ...
        </Typography>
      </Box>
    </Fade>
  );
}