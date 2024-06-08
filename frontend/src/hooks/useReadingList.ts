import { useState, useEffect } from "react";
import { Book } from "../types";

/**
 * Custom hook to manage the reading list state.
 */
const useReadingList = () => {
  const [readingList, setReadingList] = useState<Book[]>([]);

  // reading from the localStorage
  useEffect(() => {
    const storedReadingList = localStorage.getItem("readingList");
    if (storedReadingList) {
      setReadingList(JSON.parse(storedReadingList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("readingList", JSON.stringify(readingList));
  }, [readingList]);

  // add to the reading list if the book is not in the list already
  const addToReadingList = (book: Book): string => {
    const bookExists = isBookInReadingList(book);
    if (bookExists) {
      return "Book already in the reading list";
    } else {
      setReadingList((prevList) => [...prevList, book]);
      return "Book added to the reading list";
    }
  };

  // remove a book from the list
  const removeFromReadingList = (book: Book): string => {
    setReadingList((prevList) =>
      prevList.filter(
        (b) => !(b.title === book.title && b.author === book.author)
      )
    );
    return "Removed the book from the reading list";
  };

  // check if a book is in the list
  const isBookInReadingList = (book: Book): boolean => {
    return readingList.some(
      (b) => b.title === book.title && b.author === book.author
    );
  };

  return {
    readingList,
    addToReadingList,
    removeFromReadingList,
    isBookInReadingList,
  };
};

export default useReadingList;
