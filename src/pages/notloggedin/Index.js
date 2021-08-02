import React from "react";
//material ui imports

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    margin: "100px auto",
    background: "#FAEBD7",
    padding: "50px",
  },
}));

//component
const NotLoginPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h4">You Must Login first !!!</Typography>
        <Typography variant="h6">Do you want to Login</Typography>
        <Link to="/">
          <Typography variant="h6">Click here</Typography>
        </Link>
      </Container>
    </div>
  );
};
export default NotLoginPage;
