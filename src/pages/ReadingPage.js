import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  removeBookFromReadingList,
  fetchReadingList,
} from "../features/book/bookSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const books = useSelector((state) => state.book.readingList);
  const status = useSelector((state) => state.book?.status);
  const [removedBookId, setRemovedBookId] = useState("");
  const navigate = useNavigate();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const removeBook = (bookId) => {
    setRemovedBookId(bookId);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (removedBookId) return;
    dispatch(fetchReadingList());
  }, [dispatch, removedBookId]);

  useEffect(() => {
    if (!removedBookId) return;
    dispatch(removeBookFromReadingList(removedBookId));
    setRemovedBookId("");
  }, [dispatch, removedBookId]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Book Store
      </Typography>
      {status === "loading" ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          {books?.length >= 0
            ? books.map((book) => (
                <Card
                  key={book.id}
                  sx={{
                    width: "12rem",
                    height: "27rem",
                    marginBottom: "2rem",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={`${BACKEND_API}/${book.imageLink}`}
                      alt={`${book.title}`}
                      onClick={() => handleClickBook(book.id)}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {`${book.title}`}
                      </Typography>
                      <Typography gutterBottom variant="body1" component="div">
                        {`${book.author}`}
                      </Typography>
                      <Button
                        sx={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          backgroundColor: "secondary.light",
                          color: "secondary.contrastText",
                          padding: "0",
                          minWidth: "1.5rem",
                        }}
                        size="small"
                        onClick={() => removeBook(book.id)}
                      >
                        &times;
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            : "No Reading List Book Data Found."}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;
