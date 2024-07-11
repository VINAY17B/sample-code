import React from "react";
import Layouts from "./components/Layouts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Searchbar from "./components/Searchbar";
import Cardlist from "./components/Cardlist";

import SearchOptions from "./components/SearchOptions";

function App() {
  return (
    <Layouts>
      <Searchbar></Searchbar>
      {/* <SearchOptions></SearchOptions> */}
      <Cardlist></Cardlist>
    </Layouts>
  );
}

export default App;
