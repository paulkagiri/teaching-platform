import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  TextField,
  Autocomplete,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { GET_BOOKS } from "../graphql/queries";
import { Book } from "../types";

interface BookSearchProps {
  addToReadingList: (book: Book) => void;
}

/**
 * Component to search for books and add them to the reading list.
 */
const BookSearch: React.FC<BookSearchProps> = ({ addToReadingList }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books</p>;

  const books: Book[] = data.books;

  const handleSelect = (event: any, value: Book | null) => {
    if (value) {
      addToReadingList(value);
      setSelectedBook(null); // Clear the selection
      setInputValue(""); // Clear the input value
    }
  };

  return (
    <div>
      <Autocomplete
        options={books}
        getOptionLabel={(option) => `${option.title} by ${option.author}`}
        style={{ width: 300, marginBottom: 20 }}
        renderOption={(props, option) => (
          <ListItem {...props} key={`${option.title}-${option.author}`}>
            <ListItemAvatar>
              <Avatar src={option.coverPhotoURL} alt={option.title} />
            </ListItemAvatar>
            <ListItemText primary={option.title} secondary={option.author} />
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Search Books" variant="outlined" />
        )}
        onChange={handleSelect}
        value={selectedBook}
        inputValue={inputValue} // Bind inputValue state
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)} // Update inputValue state
      />
    </div>
  );
};

export default BookSearch;
