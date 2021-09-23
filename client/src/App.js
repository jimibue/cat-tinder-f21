import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Things from "./pages/Things";
import ComponentDemo from "./pages/CompentDemo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FetchUser from "./components/FetchUser";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCats from "./pages/MyCats";

function App() {
  return (
    <>
      <Navbar />
      <FetchUser>
        <Container>
          <Switch>
            {/* you have to be logged in to see this */}
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/my_cats" component={MyCats} />
            {/* you do not have to be logged in to see this */}
            <Route exact path="/things" component={Things} />
            <Route exact path="/components" component={ComponentDemo} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route component={() => <p>react router 404 path not found</p>} />
          </Switch>
        </Container>
      </FetchUser>
    </>
  );
}

export default App;
