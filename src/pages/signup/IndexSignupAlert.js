import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
    zIndex: "1000",
  },
}));
const LoginAlert = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success">account Created successfully</Alert>
    </div>
  );
};

export default LoginAlert;
