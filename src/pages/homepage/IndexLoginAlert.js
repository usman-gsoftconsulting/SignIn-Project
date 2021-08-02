import React from "react";
//material ui imports
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//hooks imports

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    margin: "20px auto",
    zIndex: 999,
  },
}));

const LoginAlert = () => {
  const state = useSelector((state) => state.auth);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success">
        {state.loggedInUser} Logged in successfully
      </Alert>
    </div>
  );
};
export default LoginAlert;
