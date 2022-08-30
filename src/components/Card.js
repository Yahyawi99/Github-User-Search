import React, { useEffect, useRef, useState } from "react";
// Card CSS
import "./Card.css";

const Months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "August",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// format date from api url
const formatDate = (date) => {
  let string = date.replace(/\W/g, " ");
  let myRegex = /[0-9]{0,4}/g;
  let result = string.match(myRegex);
  result = result.filter((e) => e);
  result = result.splice(0, 3);
  return result;
};

const Card = ({ data }) => {
  // hooks
  const refContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [userData, setUserData] = useState(data);

  /*  Functions */
  // toggle mode
  const toggleMode = () => {
    const myContainer = document.querySelector(".container");

    if (myContainer) {
      //   Container
      myContainer.classList.toggle("darkContainer");
      //   Header
      myContainer.children[0].classList.toggle("darkModeHeader");
      //   Followers
      myContainer.children[1].classList.toggle("darkFollowers");
      // Footer
      myContainer.children[2].classList.toggle("Darklinks");
    }
  };
  // error
  const error = (text) => {
    const error = document.querySelector(".error");

    error.textContent = text;

    error.style.display = "initial";
    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
  };
  // format input value for api url
  function formatValue(input) {
    if (input.value) {
      return `/${input.value}`;
    } else {
      return "";
    }
  }

  useEffect(() => {
    const button = document.querySelector(".searchBtn");

    // Toggling the mode function
    const modeContainer = document.querySelector(".modeContainer");
    modeContainer.addEventListener("click", toggleMode);

    // Get Data
    button.addEventListener("click", function() {
      const SearchInput = document.querySelector(".search");

      if (!SearchInput.value || SearchInput.value.includes(" ", /\W/g)) {
        error("Not Valid");
      } else {
        setIsLoading(true);

        fetch(`https://api.github.com/users${formatValue(SearchInput)}`)
          .then((res) => {
            if (res.status >= 200 && res.status <= 299) {
              setIsLoading(false);
              return res.json();
            } else {
              error("Not Found");
              setSearch(true);
              setIsLoading(false);
            }
          })
          .then((user) => {
            if (user) {
              setSearch(false);

              const {
                avatar_url,
                name,
                login,
                created_at,
                bio,
                public_repos,
                followers,
                following,
                location,
                html_url,
                twitter_username,
                company,
                blog,
              } = user;

              setUserData({
                avatar_url,
                name,
                login,
                created_at,
                bio,
                public_repos,
                followers,
                following,
                location,
                html_url,
                twitter_username,
                company,
                blog,
              });
            }
          })
          .catch(() => {
            error("Error");
            setSearch(true);
            setIsLoading(false);
          });
      }

      SearchInput.value = "";
    });
  }, []);

  useEffect(() => {
    const mode = document.querySelector(".icon");
    const currentMode = mode.dataset.mode;
    const myContainer = document.querySelector(".container");

    // check for the mode after every re-render
    if (currentMode === "dark" && myContainer) {
      //   Container
      myContainer.classList.add("darkContainer");
      //   Header
      myContainer.children[0].classList.add("darkModeHeader");
      // //   Followers
      myContainer.children[1].classList.add("darkFollowers");
      // // Footer
      myContainer.children[2].classList.add("Darklinks");
    }
  });

  if (isLoading) {
    return <Loading />;
  }
  if (search) {
    return <Failed />;
  }

  return (
    <article ref={refContainer} className="container">
      <Header {...userData} />
      <Body {...userData} />
      <Footer {...userData} />
    </article>
  );
};

// children components
const Header = (prop) => {
  return (
    <section className="header">
      <div className="userImage">
        <img src={prop.avatar_url} alt="github-user" />
      </div>

      <div className="description">
        <div className="descContainer">
          <div className="info">
            <h1 className="name">{prop.name && prop.name}</h1>
            <a href={prop.html_url}>@{prop.login}</a>
          </div>
          <h4 className="date">
            Joined {formatDate(prop.created_at)[2]}{" "}
            {Months[formatDate(prop.created_at)[1] - 1]}{" "}
            {formatDate(prop.created_at)[0]}
          </h4>
        </div>

        <p className="bio"> {prop.bio || "This profile has no Bio"} </p>
      </div>
      <p className="second-bio">{prop.bio || "This profile has no Bio."} </p>
    </section>
  );
};
const Body = (prop) => {
  return (
    <section className="followers">
      <div>
        <h3>Repos</h3>
        <p className="reposNumber"> {prop.public_repos} </p>
      </div>
      <div>
        <h3>Followers</h3>
        <p className="FollowersNumber"> {prop.followers} </p>
      </div>
      <div>
        <h3>Following</h3>
        <p className="FollowingNumber">{prop.following}</p>
      </div>
    </section>
  );
};
const Footer = (prop) => {
  return (
    <section className="links">
      <ul>
        <li className="locationContainer">
          <svg
            className="icon"
            height="20"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.797 3.425C11.584 1.33 9.427.05 7.03.002a7.483 7.483 0 00-.308 0C4.325.05 2.17 1.33.955 3.425a6.963 6.963 0 00-.09 6.88l4.959 9.077.007.012c.218.38.609.606 1.045.606.437 0 .828-.226 1.046-.606l.007-.012 4.96-9.077a6.963 6.963 0 00-.092-6.88zm-5.92 5.638c-1.552 0-2.813-1.262-2.813-2.813s1.261-2.812 2.812-2.812S9.69 4.699 9.69 6.25 8.427 9.063 6.876 9.063z"
              fill="#4b6a9b"
            />
          </svg>
          {prop.location ? (
            <h3> {prop.location} </h3>
          ) : (
            <p
              style={{
                opacity: "0.5",
                fontSize: "1.15rem",
                pointerEvents: "none",
              }}
            >
              Not Provided
            </p>
          )}
        </li>

        <li className="websiteContainer">
          <svg
            className="icon"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#4b6a9b">
              <path d="M7.404 5.012c-2.355 2.437-1.841 6.482.857 8.273.089.06.207.048.283-.027.568-.555 1.049-1.093 1.47-1.776a.213.213 0 00-.084-.3A2.743 2.743 0 018.878 10.1a2.64 2.64 0 01-.223-1.803c.168-.815 1.043-1.573 1.711-2.274l-.004-.002 2.504-2.555a2.568 2.568 0 013.648-.019 2.6 2.6 0 01.037 3.666l-1.517 1.56a.266.266 0 00-.06.273c.35 1.012.435 2.44.201 3.519-.006.03.031.05.053.028l3.228-3.295c2.062-2.105 2.044-5.531-.04-7.615a5.416 5.416 0 00-7.691.04L7.417 4.998l-.013.014z" />
              <path d="M13.439 13.75a.401.401 0 00.006-.003c.659-1.204.788-2.586.48-3.933l-.002.002-.001-.001a5.434 5.434 0 00-2.19-3.124.3.3 0 00-.333.015c-.553.448-1.095 1.021-1.452 1.754a.243.243 0 00.096.317c.415.24.79.593 1.04 1.061h.001c.196.33.388.958.263 1.632-.116.894-1.019 1.714-1.736 2.453-.546.559-1.935 1.974-2.49 2.542a2.6 2.6 0 01-3.666.037 2.6 2.6 0 01-.038-3.666l1.521-1.564A.266.266 0 005 11.004c-.338-1.036-.43-2.432-.217-3.51.006-.03-.031-.049-.053-.027l-3.179 3.245c-2.083 2.126-2.066 5.588.04 7.693 2.125 2.083 5.57 2.048 7.653-.078.723-.81 3.821-3.678 4.195-4.577z" />
            </g>
          </svg>

          {prop.blog ? (
            <a
              href={prop.blog}
              target="_blank"
              rel="noreferrer"
              className="website"
            >
              {prop.blog}
            </a>
          ) : (
            <p
              style={{
                opacity: "0.5",
                fontSize: "1.15rem",
                pointerEvents: "none",
              }}
            >
              Not Provided
            </p>
          )}
        </li>
      </ul>

      <ul>
        <li className="twitterContainer">
          <svg
            className="icon"
            height="18"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2.799a8.549 8.549 0 01-2.363.647 4.077 4.077 0 001.804-2.266 8.194 8.194 0 01-2.6.993A4.099 4.099 0 009.75 4.977c0 .324.027.637.095.934-3.409-.166-6.425-1.8-8.452-4.288a4.128 4.128 0 00-.56 2.072c0 1.42.73 2.679 1.82 3.408A4.05 4.05 0 01.8 6.598v.045a4.119 4.119 0 003.285 4.028 4.092 4.092 0 01-1.075.135c-.263 0-.528-.015-.776-.07.531 1.624 2.038 2.818 3.831 2.857A8.239 8.239 0 01.981 15.34 7.68 7.68 0 010 15.285a11.543 11.543 0 006.29 1.84c7.545 0 11.67-6.25 11.67-11.667 0-.182-.006-.357-.015-.53A8.18 8.18 0 0020 2.798z"
              fill="#4b6a9b"
            />
          </svg>

          {prop.twitter_username ? (
            <a
              href={
                prop.twitter_username &&
                "https://twitter.com/" + prop.twitter_username
              }
              target="_blank"
              rel="noreferrer"
            >
              {prop.twitter_username}
            </a>
          ) : (
            <p
              style={{
                opacity: "0.5",
                fontSize: "1.15rem",
                pointerEvents: "none",
              }}
            >
              Not Provided
            </p>
          )}
        </li>

        <li className="companyContainer">
          <svg
            className="icon"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#4b6a9b">
              <path d="M10.858 1.558L1.7.167A1.477 1.477 0 00.517.492 1.49 1.49 0 000 1.608v17.559c0 .458.375.833.833.833h2.709v-4.375c0-.808.65-1.458 1.458-1.458h2.083c.809 0 1.459.65 1.459 1.458V20h3.541V3a1.46 1.46 0 00-1.225-1.442zM4.583 12.292h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm4.167 7.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5H7.5a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zM18.85 9.035l-5.933-1.242V20h5.625A1.46 1.46 0 0020 18.542V10.46c0-.688-.47-1.274-1.15-1.425zM16.875 17.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25zm0-2.5h-1.25a.625.625 0 010-1.25h1.25a.625.625 0 010 1.25z" />
            </g>
          </svg>

          {prop.company ? (
            <h3> prop.company </h3>
          ) : (
            <p
              style={{
                opacity: "0.5",
                fontSize: "1.15rem",
                pointerEvents: "none",
              }}
            >
              Not Provided
            </p>
          )}
        </li>
      </ul>
    </section>
  );
};

const Loading = () => {
  return <h3>Loading...</h3>;
};
const Failed = () => {
  return <></>;
};

export default Card;
