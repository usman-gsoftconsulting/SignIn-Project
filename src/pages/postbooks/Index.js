//  material ui imports
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import MenuBookIcon from "@material-ui/icons/MenuBook";

//hooks import
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//files import

import postBook from "../../redux/actions/PostBooks";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: "red",
    fontSize: "15px",
    marginLeft: "10px",
  },
  publishButton: {
    marginBottom: "20px",
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  navigationButtons: {
    textDecoration: "none",
    padding: "8px",
    widht: "150px",
    fontSize: "15px",
    fontWeight: "700",
    fontFamily: "uchen",
    color: "black",
    border: "1px solid black",
    boxShadow: "0px -1px 9px 0px rgba(0,0,0,0.15)",
    borderRadius: "10px",
    backgroundColor: "transparent",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#ffb703",
    },
  },
  selectInput: {
    margin: "10px 0px",
  },
}));

const PostBook = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    console.log(data);
    const response = await dispatch(
      postBook({
        name: data.name,
        slug: data.Slug.replace(/\s/g, ""),
        noOfPages: data.NoOfPages,
        author: data.AuthorName,
        category: data.Category,
      })
    );
    if (response.status === 200) {
      alert("book PUBLISHED !!");
      history.push("/booklist/booksdetail");
    }
    if (response.status === "Network Error") {
      alert("Check Your Network");
    }
    e.target.reset();
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MenuBookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Publish Your Book Today !
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  name="name"
                  className={classes.input}
                  {...register("name", {
                    required: true,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="Slug"
                  label="Slug"
                  type="text"
                  id="Slug"
                  className={classes.input}
                  {...register("Slug", { required: true })}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="author name"
                label="author name"
                autoFocus
                className={classes.input}
                {...register("AuthorName", {
                  required: true,

                  pattern: /[a-zA-Z]+/i,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                type="number"
                fullWidth
                id="no of Pages"
                label="no of Pages"
                autoFocus
                className={classes.input}
                {...register("NoOfPages", { required: true })}
              />
            </Grid>

            <Grid item xs={12} className={classes.selectInput}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select {...register("Category", { required: true })}>
                <MenuItem value="suspense" selected>
                  suspense
                </MenuItem>
                <MenuItem value="drama"> drama</MenuItem>
              </Select>
            </Grid>
            {errors.Category && (
              <p className={classes.errorMessage}>this is required</p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.publishButton}
            >
              Publish
            </Button>
          </form>

          <Grid container={true} spacing={8} justify="center">
            <Grid item>
              <Link to="/booklist/">
                <button className={classes.navigationButtons}>
                  Check out books
                </button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/homepage">
                <button className={classes.navigationButtons}>back</button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default PostBook;
