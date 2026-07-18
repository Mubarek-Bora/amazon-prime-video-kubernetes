import React from "react";
import { useTrailer } from "../TrailerContext";

function TrailerModal() {
  const { activeTitle, videoId, closeTrailer } = useTrailer();

  if (!activeTitle) return null;

  return (
    <div
      onClick={closeTrailer}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(90vw, 960px)",
          background: "#000",
          position: "relative",
        }}
      >
        <button
          onClick={closeTrailer}
          style={{
            position: "absolute",
            top: -40,
            right: 0,
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 28,
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          ✕
        </button>
        {videoId ? (
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              title={`${activeTitle} trailer`}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div style={{ padding: 48, textAlign: "center", color: "#fff" }}>
            <p style={{ marginBottom: 16 }}>
              No verified trailer on file for "{activeTitle}".
            </p>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                activeTitle + " official trailer"
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#00a8e1" }}
            >
              Search for it on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrailerModal;
