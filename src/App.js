import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Demo from "./views/Demo";
import Home from "./views/Home";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Box from "@material-ui/core/Box";
import Sites from "./views/Sites";
import { AppCtxt } from "./Context";
import { callClient } from "./MyApolloProvider";
import { GET_TAGS } from "./graphql/tags";
import Tools from "./views/Tools";

function App() {
  const { tags, setTags } = React.useContext(AppCtxt);

  React.useEffect(() => {
    async function getTags() {
      let data = await callClient(GET_TAGS);
      setTags(data.tags);
    }
    if (tags.length === 0) {
      getTags();
    }
  }, [tags, setTags]);

  return (
    <Box height="100%">
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/demo" component={Demo} />
        <Route path="/sites" component={Sites} />
        <Route path="/tools" component={Tools} />
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
