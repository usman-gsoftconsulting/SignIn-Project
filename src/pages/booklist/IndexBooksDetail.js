// material ui imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
//hooks import
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

//files import
import BooksApiCall from "../../redux/actions/GetBooks";
import Loader from "../booklist/IndexLoader";
import Navbar from "../homepage/IndexNavBar";
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fefae0",
    margin: "70px auto",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
  table: {
    width: "90%",
  },
  backLink: {
    textDecoration: "none",
    backgroundColor: "black",
    border: "none",
    margin: "20px 20px",
    borderRadius: "10px",
    opacity: 0.9,
    "&:hover": {
      backgroundColor: "#49090E",
      boxShadow: "none",
      transition: "background-color 0.3s linear",
      opacity: 0.8,
    },
    "& > *": {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      padding: "25px",
      fontFamily: "Uchen",
    },
  },
  tableHead: {
    backgroundColor: "#023047",
    margin: "10px 10px",
    borderRadius: "50px",
    "& > *": {
      margin: "10px 10px",
      padding: "6px",
      widht: "50px",
      color: "white",
      fontSize: "22px",
      fontWeight: "400",
    },
  },
  tableRow: {
    "& > *": {
      margin: "10px 10px",
      padding: "10px",
      textAlign: "center",
      fontFamily: "uchen",
    },
  },
}));

const BooksData = () => {
  const history = useHistory();
  let { path } = useRouteMatch();
  const { booksList, loaderStatus, errorMessage } = useSelector(
    (state) => state.auth
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (booksList?.length === 0) {
      console.log("inside condition");
      dispatch(BooksApiCall());
    }
    console.log(errorMessage);
    if (errorMessage === "Network Error") {
      alert("network error try agian later");
    }
    console.log("outside condition");
  }, []);

  return (
    <>
      <Navbar />
      <Grid container justify="flex-end">
        <Grid item>
          <button className={classes.backLink}>
            <NavLink to="/homepage/">Go Back</NavLink>
          </button>
        </Grid>
      </Grid>
      <Container className={classes.root} maxWidth="md">
        <br />

        {loaderStatus ? (
          <table className={classes.table} cellspacing="0" cellpadding="0">
            <tr className={classes.tableHead}>
              <th>#</th>
              <th>Author</th>
              <th>Category</th>
              <th>No of Pages</th>
              <th>Published In</th>
              <th></th>
            </tr>

            {booksList?.length === 0 ? (
              <h1>No books </h1>
            ) : (
              booksList &&
              booksList.map((BooksDetails, idx) => {
                return (
                  <tr key={idx} className={classes.tableRow}>
                    <td>{idx}</td>
                    <td>{BooksDetails.name}</td>
                    <td>{BooksDetails.category}</td>
                    <td>{BooksDetails.noOfPages}</td>
                    <td>{BooksDetails.published_at}</td>
                    <td>
                      <Button
                        color="primary"
                        size="small"
                        disableRipple={false}
                        variant="contained"
                        onClick={() => {
                          history.push(`/singlebookdetail/${BooksDetails._id}`);
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </table>
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
};
export default BooksData;

// {loaderStatus ? (
//   <TableContainer>
//     <Table className={classes.table} aria-label="simple table">
//       <TableHead>
//         <TableRow>
//           <TableCell className={classes.TableCell}>
//             Book Author
//           </TableCell>
//           <TableCell>Category</TableCell>
//           <TableCell>No of Pages</TableCell>
//           <TableCell>Published In</TableCell>
//           <TableCell></TableCell>
//           <TableCell></TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {booksList?.length === 0 ? (
//           <h1>No books </h1>
//         ) : (
//           booksList &&
//           booksList.map((BooksDetails, idx) => {
//             return (
//               <TableRow key={idx}>
//                 <TableCell>{BooksDetails.name}</TableCell>
//                 <TableCell>{BooksDetails.category}</TableCell>
//                 <TableCell>{BooksDetails.noOfPages}</TableCell>
//                 <TableCell>{BooksDetails.published_at}</TableCell>
//                 <TableCell>
//                   <Button
//                     color="primary"
//                     size="small"
//                     disableRipple={false}
//                     variant="contained"
//                     onClick={() => {
//                       history.push(`${path}/${BooksDetails._id}`);
//                     }}
//                   >
//                     Details
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             );
//           })
//         )}
//       </TableBody>
//     </Table>
//   </TableContainer>
