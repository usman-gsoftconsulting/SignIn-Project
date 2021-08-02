import Signin from "./pages/signin/Index";
import Signup from "./pages/signup/Index";
import HomePage from "./pages/homepage/IndexHome";
import NotLoginPage from "./pages/notloggedin/Index";
import PublishBook from "./pages/postbooks/Index";
import BookList from "./pages/booklist/IndexBooksDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleBookPage from "./pages/singlebookdetail/IndexSingleBookDetail";

import "./App.css";
const Routes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={isAuthenticated ? HomePage : Signin}
          />

          <Route
            exact
            path="/signup"
            component={isAuthenticated ? HomePage : Signup}
          />
          <Route
            path="/homepage/"
            exact
            component={isAuthenticated ? HomePage : NotLoginPage}
          />
          <Route
            path="/booklist/"
            exact
            component={isAuthenticated ? BookList : NotLoginPage}
          />

          <Route
            exact
            path="/postbooks/"
            component={isAuthenticated ? PublishBook : NotLoginPage}
          />
          <Route
            exact
            path="/singlebookdetail/:id"
            component={isAuthenticated ? SingleBookPage : NotLoginPage}
          />
        </Switch>
      </Router>
    </div>
  );
};
export default Routes;
