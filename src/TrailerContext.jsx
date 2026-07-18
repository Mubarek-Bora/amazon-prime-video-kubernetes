import React, { createContext, useContext, useState } from "react";
import trailers from "./trailerData";

const TrailerContext = createContext(null);

export function TrailerProvider({ children }) {
  const [activeTitle, setActiveTitle] = useState(null);

  const openTrailer = (title) => setActiveTitle(title);
  const closeTrailer = () => setActiveTitle(null);

  const videoId = activeTitle ? trailers[activeTitle] : undefined;

  return (
    <TrailerContext.Provider
      value={{ activeTitle, videoId, openTrailer, closeTrailer }}
    >
      {children}
    </TrailerContext.Provider>
  );
}

export function useTrailer() {
  return useContext(TrailerContext);
}
