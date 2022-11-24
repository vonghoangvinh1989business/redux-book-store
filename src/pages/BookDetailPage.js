import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import {
  Container,
  Button,
  Box,
  Grid,
  Stack,
  Typography,
  Alert,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  getBookDetail,
  addBookToReadingList,
} from "../features/book/bookSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const book = useSelector((state) => state.book.bookDetail);
  const status = useSelector((state) => state.book?.status);
  const error = useSelector((state) => state.book?.error);

  const params = useParams();
  const bookId = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookDetail(bookId));
  }, [dispatch, bookId]);

  return (
    <Container>
      {status === "loading" ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : status === "failed" && error ? (
        <Alert sx={{ m: 1 }} severity="error">
          {error}
        </Alert>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book ? (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => dispatch(addBookToReadingList(book))}
                >
                  Add to Reading List
                </Button>
              </Stack>
            ) : (
              "No Book Detail Data Found."
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
