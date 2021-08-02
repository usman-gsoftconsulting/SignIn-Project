import React, { useState, useEffect } from "react";
//material ui imports
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
//hooks imports
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
//files imports
import Navbar from "../homepage/IndexNavBar";
import BookDetailBackground from "../../assets/bookdetailbackground.jpg";
import deleteBook from "../../redux/actions/DeleteBook";
import BooksApiCall from "../../redux/actions/GetBooks";
import Loader from "../booklist/IndexLoader";
//
const useStyles = makeStyles({
  root: {
    padding: "10px",
    backgroundImage: `url(${BookDetailBackground})`,
    minHeight: 568,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
  },
  backButton: {
    width: "50%",
    margin: "15px auto ",
  },
  deleteButton: {
    marginLeft: "15px",
  },
  bookHeading: {
    color: "white",
    margin: "20px auto",
    backgroundColor: "rgba(0, 0, 0, 0.651)",
    width: "50%",
    fontFamily: "uchen",
    padding: "10px",
  },
  bookContainer: {
    margin: "40px auto",
    backgroundColor: "white",
    padding: "10px",
  },
});
//
const BookDetail = () => {
  // hooks

  const [deleteBtn, setDeleteBtn] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { booksList, errorMessage } = useSelector((state) => state.auth);

  // methods;
  useEffect(() => {
    dispatch(BooksApiCall());
    if (errorMessage === "Network Error") {
      alert("check your internet connection");
    }
  });

  const BookDetail =
    booksList &&
    booksList.filter((BookItems) => {
      return BookItems.id === id;
    });

  const BookDeleteButton = async () => {
    setDeleteBtn(true);
    if (window.confirm("are you sure ?")) {
      const response = await dispatch(deleteBook(id));
      console.log(response);

      if (response.status === 200) {
        alert("Book Deleted Succesfully");
        history.push("/");
        setDeleteBtn(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <Typography variant="h4" align="center" className={classes.bookHeading}>
          Book detail
        </Typography>
        <Container maxWidth="xs" className={classes.bookContainer}>
          {booksList?.length === 0 ? (
            <Loader />
          ) : (
            BookDetail &&
            BookDetail.map((book, idx) => {
              return (
                <div key={idx}>
                  <p>
                    <Typography variant="h5">Author</Typography> {book.name}
                  </p>
                  <p>
                    <Typography variant="h5">Category</Typography>{" "}
                    {book.category}
                  </p>
                  <p>
                    <Typography variant="h5">Book slug</Typography> {book.slug}
                  </p>
                  <p>
                    <Typography variant="h5">Book published date</Typography>{" "}
                    {book.published_at}
                  </p>
                  <p> </p>
                </div>
              );
            })
          )}

          {booksList?.length !== 0 ? (
            <div className={classes.backButton}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => history.push("/")}
              >
                Back
              </Button>
              <Button
                color="secondary"
                size="small"
                disableRipple={false}
                variant="contained"
                disabled={deleteBtn}
                className={classes.deleteButton}
                onClick={BookDeleteButton}
                endIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </Container>
      </Container>
    </>
  );
};

export default BookDetail;
