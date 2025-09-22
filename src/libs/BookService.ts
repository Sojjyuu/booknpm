// src/services/BookService.ts
import type { Book } from "@/types/book";

export default class BookService {
  // CREATE - เพิ่มหนังสือใหม่
  static async createBook(data: Book): Promise<Response> {
    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  // READ - ดึงหนังสือทั้งหมด
  static async getBooks(): Promise<Response> {
    return fetch("http://localhost:3000/api/books");
  }

  // READ - ดึงหนังสือรายเล่ม
  static async getBookById(id: string): Promise<Response> {
    return fetch(`http://localhost:3000/api/books/${id}`);
  }

  // UPDATE - อัปเดตข้อมูลหนังสือ
  static async updateBook(id: string, data: Partial<Book>): Promise<Response> {
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  // DELETE - ลบหนังสือรายเล่ม
  static async deleteBook(id: string): Promise<Response> {
    return fetch(`http://localhost:3000/api/books/${id}`, {
      method: "DELETE",
    });
  }
}
