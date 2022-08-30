import React, { useState } from "react";

// Header CSS
import "./Header.css";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  const modeHandller = (e) => {
    let myHeader = e.currentTarget.parentElement;

    setIsDark(!isDark);
    myHeader.classList.toggle("darkModeHedader");
    document.body.classList.toggle("darkModeBody");
  };
  return (
    <header>
      <h1>devFinder</h1>
      <div className="modeContainer" onClick={modeHandller}>
        <p className="mode">
          {isDark || "DARK"}
          {isDark && "LIGHT"}
        </p>
        {isDark ? (
          <img
            className="icon"
            src={"assets/icon-sun.svg"}
            data-mode="dark"
            alt="mode"
          />
        ) : (
          <img
            className="icon"
            src={"assets/icon-moon.svg"}
            data-mode="light"
            alt="mode"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
