import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
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
      <Typography variant="h4" gutterBottom>
        Reading List
      </Typography>
      <Grid container spacing={4}>
        {readingList.map((book) => (
          <Grid item key={`${book.title}-${book.author}`} xs={12} sm={6} md={4}>
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
    </div>
  );
};

export default ReadingList;
