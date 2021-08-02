import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: "10px",
      width: "1000px",
    },
  },
}));

const ErrorMessage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error">Password Must be 5 characters long</Alert>
    </div>
  );
};
export default ErrorMessage;
