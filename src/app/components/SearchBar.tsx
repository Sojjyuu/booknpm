"use client";
import { Paper, Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 4,
        borderRadius: "12px",
        bgcolor: "#FFF8DC",
        border: "1px solid #DAA520",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <SearchIcon sx={{ color: "#8B4513" }} />
        <TextField
          placeholder="ค้นหาหนังสือ, ผู้แต่ง, หรือประเภท..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              background: "white",
            },
          }}
        />
      </Box>
    </Paper>
  );
}