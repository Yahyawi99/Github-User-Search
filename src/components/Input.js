import React, { useRef } from "react";

// Input CSS
import "./Input.css";

const Input = () => {
  const refSearch = useRef(null);

  const CheckDarkMode = () => {
    const icon = document.querySelector(".modeContainer");

    icon.addEventListener("click", function () {
      refSearch.current.classList.toggle("darkFormControle");
    });
  };

  return (
    <div className="formControle" ref={refSearch} onLoad={CheckDarkMode}>
      <img src={"assets/icon-search.svg"} alt="search" className="searchIcon" />
      <input
        type="text"
        placeholder="Search GitHub username..."
        className="search"
      />
      <p className="error">Not Found</p>
      <button className="searchBtn" type="button">
        Search
      </button>
    </div>
  );
};

export default Input;
