import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Book } from "../types";

interface ReadingListProps {
  readingList: Book[];
  removeFromReadingList: (book: Book) => void;
}

/**
 * Component to display the reading list.
 */
const ReadingList: React.FC<ReadingListProps> = ({
  readingList,
  removeFromReadingList,
}) => {
  return (
    <div>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Reading List
        </Typography>
      </Box>
      {readingList.length === 0 ? (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Your reading list is empty, kindly search a book above and add it to
            the list.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {readingList.map((book) => (
            <Grid
              item
              key={`${book.title}-${book.author}`}
              xs={12}
              sm={6}
              md={4}
            >
              <Card>
                <CardMedia
                  component="img"
                  alt={book.title}
                  height="140"
                  image={book.coverPhotoURL}
                  title={book.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => removeFromReadingList(book)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ReadingList;
