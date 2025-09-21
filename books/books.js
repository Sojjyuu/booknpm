import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const books = [
    {
      _id: "1",
      title: "Brave New World",
      author: "Aldous Huxley",
      coverImage: "https://covers.openlibrary.org/b/id/8775116-L.jpg"
    },
    {
      _id: "2",
      title: "The Alchemist",
      author: "Paulo Coelho",
      coverImage: "https://covers.openlibrary.org/b/id/8231856-L.jpg"
    },
    {
      _id: "3",
      title: "Animal Farm",
      author: "George Orwell",
      coverImage: "https://covers.openlibrary.org/b/id/9641654-L.jpg"
    },
    {
      _id: "4",
      title: "Lord of the Flies",
      author: "William Golding",
      coverImage: "https://covers.openlibrary.org/b/id/8232486-L.jpg"
    },
    {
      _id: "5",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      coverImage: "https://covers.openlibrary.org/b/id/8225631-L.jpg"
    },
    {
      _id: "6",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      coverImage: "https://covers.openlibrary.org/b/id/6979861-L.jpg"
    },
    {
      _id: "7",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage: "https://covers.openlibrary.org/b/id/8091016-L.jpg"
    },
    {
      _id: "8",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: "https://covers.openlibrary.org/b/id/8226191-L.jpg"
    },
    {
      _id: "9",
      title: "1984",
      author: "George Orwell",
      coverImage: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    },
    {
      _id: "10",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage: "https://covers.openlibrary.org/b/id/9871881-L.jpg"
    }
  ];

  res.status(200).json({ books });
}
