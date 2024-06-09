import { useState } from "react";

/**
 * Custom hook to manage the snackbar state.
 */
const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Display a snackbar with a given message.
  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Close the snackbar.
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return { snackbarOpen, snackbarMessage, showSnackbar, handleSnackbarClose };
};

export default useSnackbar;
