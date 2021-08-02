import React from "react";
//material ui imports
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//hooks imports
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    fontSize: "20px",
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    history.push("/");
    dispatch({ type: "LOG_OUT" });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>

          <Button color="inherit" onClick={logout}>
            LOGOUT
            <ExitToAppIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
