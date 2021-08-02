//material ui imports
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//hooks imports
import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//files imports
import LoginAlert from "./IndexLoginAlert";
import NavBar from "./IndexNavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 10px",
  },
  gridContainer: {
    padding: "20px",
    margin: "60px auto 0px auto",
    width: "70%",
  },

  showBooksButton: {
    height: "200px",
    width: "200px",
    display: "flex",
    fontSize: "20px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefae0",
    fontFamily: "'Lora', serif",
    textDecoration: "none",
  },
  publishBookButton: {
    height: "200px",
    width: "200px",
    display: "flex",
    fontSize: "20px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefae0",
    fontFamily: "'Lora', serif",
    margin: "0px 10px",
  },
  navLinkLineRemove: {
    textDecoration: "none",
  },
}));
const BooksDetail = () => {
  const dispatch = useDispatch();
  const { userLoginAlert } = useSelector((state) => state.auth);

  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "USER_LOGIN_ALERT" });
    }, 2000);
  }, []);

  return (
    <>
      <NavBar />
      <Container className={classes.root}>
        {userLoginAlert ? (
          <div className={classes.loginAlert}>
            <LoginAlert />
          </div>
        ) : null}

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.gridContainer}
        >
          <Grid item style={{ backgroundColor: "yellow" }}>
            <Link to="/booklist/" className={classes.navLinkLineRemove}>
              <Paper className={classes.showBooksButton}>Show Books</Paper>
            </Link>
          </Grid>

          <Grid item className={classes.publishBookBox}>
            <NavLink to="/postbooks/" className={classes.navLinkLineRemove}>
              <Paper className={classes.publishBookButton}>
                Publish your Book
              </Paper>
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default BooksDetail;
