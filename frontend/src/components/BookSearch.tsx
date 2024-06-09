import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  TextField,
  Autocomplete,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { CheckCircle, AddCircleOutline } from "@mui/icons-material";
import { GET_BOOKS } from "../graphql/queries";
import { Book } from "../types";

interface BookSearchProps {
  addToReadingList: (book: Book) => void;
  isBookInReadingList: (book: Book) => boolean;
}

/**
 * Component to search for books and add them to the reading list.
 */
const BookSearch: React.FC<BookSearchProps> = ({
  addToReadingList,
  isBookInReadingList,
}) => {
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
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Autocomplete
        options={books}
        getOptionLabel={(option) => `${option.title} by ${option.author}`}
        style={{ width: "100%", maxWidth: 600 }}
        renderOption={(props, option) => (
          <ListItem {...props} key={`${option.title}-${option.author}`}>
            <ListItemAvatar>
              <Avatar src={option.coverPhotoURL} alt={option.title} />
            </ListItemAvatar>
            <ListItemText primary={option.title} secondary={option.author} />
            <Box sx={{ ml: 2 }}>
              {isBookInReadingList(option) ? (
                <Tooltip title="Already in Reading List">
                  <CheckCircle color="action" />
                </Tooltip>
              ) : (
                <Tooltip title="Add to Reading List">
                  <IconButton edge="end" aria-label="add">
                    <AddCircleOutline />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Books"
            variant="outlined"
            fullWidth
          />
        )}
        onChange={handleSelect}
        value={selectedBook}
        inputValue={inputValue} // Bind inputValue state
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)} // Update inputValue state
      />
    </Box>
  );
};

export default BookSearch;
