import React from "react";
import { Container, Box, Snackbar } from "@mui/material";
import BookSearch from "./components/BookSearch";
import ReadingList from "./components/ReadingList";
import useReadingList from "./hooks/useReadingList";
import useSnackbar from "./hooks/useSnackbar";
import { Book } from "./types";

/**
 * Main application component.
 */
const App: React.FC = () => {
  const { readingList, addToReadingList } = useReadingList();
  const { snackbarOpen, snackbarMessage, showSnackbar, handleSnackbarClose } =
    useSnackbar();

  const handleAddToReadingList = (book: Book) => {
    const message = addToReadingList(book);
    showSnackbar(message);
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <BookSearch addToReadingList={handleAddToReadingList} />
        {readingList.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <ReadingList readingList={readingList} />
          </Box>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default App;
