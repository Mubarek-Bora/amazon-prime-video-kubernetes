import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useTrailer } from "../TrailerContext";

function ContentTile(props) {
  const { openTrailer } = useTrailer();
  const [isHovering, setIsHovering] = useState(false);
  // function handleMouseOver() {
  //   setIsHovering(true);
  // }
  // function handleMouseOut() {
  //   setIsHovering(false);
  // }
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ marginRight: 24 }}
      // height: 140, width: 248
    >
      <article>
        <section style={{ zIndex: 2 }}>
          <div
            onClick={() => openTrailer(props.title)}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <img
              style={{
                height: 140,
                width: 248,
                borderRadius: 8,
              }}
              src={props.poster}
              alt="poster"
            ></img>
            {isHovering && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.4)",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 40,
                }}
              >
                ▶
              </div>
            )}
          </div>
        </section>
      </article>
    </li>
  );
}

export default ContentTile;
