import React from "react";
import ReactDOM from "react-dom/client";
import HeaderComp from "./HeaderComp";
import BodyComp from "./BodyComp";
import FooterComp from "./FooterComp";
import TrailerModal from "./TrailerModal";
import { TrailerProvider } from "../TrailerContext";

function App() {
  return (
    <TrailerProvider>
      <body style={{ backgroundColor: "black" }}>
        <HeaderComp />
        <BodyComp />
        <FooterComp />
        <TrailerModal />
      </body>
    </TrailerProvider>
  );
}

export default App;
