import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Demo from "./views/Demo";
import Home from "./views/Home";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Box from "@material-ui/core/Box";

function App() {
  return (
    <Box height="100%">
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/demo" component={Demo} />
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
