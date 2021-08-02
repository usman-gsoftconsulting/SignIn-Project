import React, { useEffect, useState } from "react";
//material ui imprts
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
//hooks imports
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/actions/Auth";
import { useHistory } from "react-router-dom";
//files imports
import SignupAlert from "./IndexSignupAlert";
//
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: "red",
    fontSize: "15px",
    marginLeft: "10px",
  },
  signupCursor: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
      color: "green",
    },
  },
}));

//component

const SignUp = () => {
  const [emailStatus, setEmailStatus] = useState();
  const [signUpAlert, setSignUpAlert] = useState();
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
    const response = await dispatch(
      signup({
        username: data.Username,
        email: data.email,
        password: data.password,
      })
    );

    setEmailStatus(response?.status);
    if (response.status === 200) {
      e.target.reset();
      setSignUpAlert(true);
      setTimeout(() => {
        setSignUpAlert(false);
      }, 2000);
    }
    if (response.error === "Network Error") alert("No internet Connection");
  };
  const redirecToSignin = () => {
    history.push("/");
  };

  return (
    <>
      {signUpAlert ? <SignupAlert /> : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                  {...register("Username", {
                    required: true,

                    minLength: 5,
                  })}
                />
                {errors.Username && (
                  <p className={classes.errorMessage}>
                    minimum characters length is 5
                  </p>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  })}
                />
                {errors.email && (
                  <span className={classes.errorMessage}>invalid email </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: true,

                    minLength: 5,
                  })}
                />
                {errors.password && (
                  <p className={classes.errorMessage}>
                    minimum password length is 5
                  </p>
                )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            {emailStatus === 400 ? (
              <p className={classes.errorMessage}>
                Email already taken Try another
              </p>
            ) : null}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  onClick={redirecToSignin}
                  className={classes.signupCursor}
                  underline="none"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
