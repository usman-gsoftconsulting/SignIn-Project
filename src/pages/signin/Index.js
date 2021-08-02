import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signin } from "../../redux/actions/Auth";
import { useDispatch } from "react-redux";
import { useState } from "react";
import LoginErrorMessage from "./IndexSigninErrorMessage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: "red",
    fontSize: "17px",
    textAlign: "center",
  },
  input: {
    marginBottom: "20px",
  },
  signinCursor: {
    "&:hover": {
      color: "green",
      cursor: "pointer",
    },
  },
}));

const SignIn = () => {
  const [emailStatus, setEmailStatus] = useState();
  const [signinButton, setSigninButton] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSigninButton(true);
    const response = await dispatch(
      signin({
        email: data.email,
        password: data.password,
      })
    );
    setEmailStatus(response.status);
    if (response.status === 200) {
      history.push("/");
    } else {
      setSigninButton(false);
    }
    if (response.error === "Network Error") alert("no internet connection");
  };

  const redirectToSignup = () => {
    history.push("/signup");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            {...register("email", { required: true })}
            className={classes.input}
          />
          {errors.email && <p>Invalid Email type</p>}
          <TextField
            variant="outlined"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            required
            autoComplete="password"
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: "5",
            })}
          />
          {errors.password && <LoginErrorMessage />}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={signinButton}
          >
            Sign In
          </Button>
          {emailStatus === 400 ? (
            <p className={classes.errorMessage}>Invalid Email or Password</p>
          ) : null}
          <Grid container>
            <Grid item>
              <Link
                variant="body2"
                onClick={redirectToSignup}
                className={classes.signinCursor}
                underline="none"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default SignIn;
