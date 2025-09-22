"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { BookResponse, Book } from "../types/book";
import { User } from "./types/user"; // สมมติว่ามี type User

// Import components ที่แยกออกมา
import AuthSection from "./components/AuthSection";
import HeaderBanner from "./components/HeaderBanner";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import AddBookModal from "./components/AddBookModal";
import EditBookModal from "./components/EditBookModal";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: 2024,
    price: 0,
    available: true,
  });
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/api/books");
    if (response.ok) {
      const data = await response.json();
      const resData: BookResponse = data;
      setBooksData(resData.books);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleNewBookChange = (updates: Partial<typeof newBook>) => {
    setNewBook((prev) => ({ ...prev, ...updates }));
  };

  const handleNewBook = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(newBook),
    });
    setIsNewDialogOpen(false);
    setNewBook({
      title: "",
      author: "",
      description: "",
      genre: "",
      year: 2024,
      price: 0,
      available: true,
    });
    getData(); // refresh book list
  };

  const handleDeleteBook = async (id: string) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    getData(); // refresh book list
  };

  const openEditDialog = (book: Book) => {
    setEditBook(book);
    setIsEditDialogOpen(true);
  };

  const handleEditBookChange = (updates: Partial<Book>) => {
    if (editBook) {
      setEditBook((prev) => ({ ...prev, ...updates }));
    }
  };

  const handleUpdateBook = async () => {
    if (!editBook) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/books/${editBook._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(editBook),
    });
    setIsEditDialogOpen(false);
    setEditBook(null);
    getData(); // refresh book list
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #f5f5dc 0%, #e8e4d9 100%)",
        py: 6,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to bottom, #8B4513 0%, #A0522D 100%)",
          zIndex: -1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          background: "rgba(255, 255, 255, 0.95)",
          p: { xs: 2, md: 4 },
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(139, 69, 19, 0.2)",
          border: "2px solid #D2B48C",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header Banner */}
        <HeaderBanner />

        {/* Auth Section */}
        <AuthSection user={user} onLogout={handleLogout} />

        {/* Add New Book Button (เฉพาะเมื่อ login แล้ว) */}
        {user && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              mb: 4,
              bgcolor: "#8B4513",
              "&:hover": { bgcolor: "#A0522D" },
              borderRadius: "12px",
              fontFamily: "'Georgia', serif",
              textTransform: "none",
              px: 4,
              boxShadow: "0px 4px 12px rgba(139, 69, 19, 0.3)",
            }}
            onClick={() => setIsNewDialogOpen(true)}
          >
            ➕ เพิ่มหนังสือใหม่
          </Button>
        )}

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Book List */}
        <BookList
          books={booksData}
          user={user}
          searchTerm={searchTerm}
          isLoading={isLoading}
          onEdit={openEditDialog}
          onDelete={handleDeleteBook}
        />

        {/* Add New Book Modal */}
        <AddBookModal
          open={isNewDialogOpen}
          onClose={() => setIsNewDialogOpen(false)}
          newBook={newBook}
          onNewBookChange={handleNewBookChange}
          onSubmit={handleNewBook}
        />

        {/* Edit Book Modal */}
        <EditBookModal
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          editBook={editBook}
          onEditBookChange={handleEditBookChange}
          onSubmit={handleUpdateBook}
        />
      </Container>
    </Box>
  );
}