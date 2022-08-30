import React, { useEffect, useState } from "react";
import axios from "axios";
// Header Feilde
import Header from "./components/Header";
// Search Input
import Search from "./components/Input";
// User Card
import Card from "./components/Card";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);
  const [data, setData] = useState("");

  const getdata = async () => {
    try {
      const response = await axios("https://api.github.com/users/yahyawi99");

      setData(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsFailed(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (isFailed) {
    return <Failed />;
  }

  return (
    <>
      <Header />
      <Search />
      <Card data={data} />
    </>
  );
}

const Loading = () => {
  return <h3 style={{ textAlign: "center", marginTop: "25px" }}>Loading...</h3>;
};

const Failed = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "25px" }}>
        Oops!! something went wrong!!
      </h2>
      <h2 style={{ textAlign: "center" }}>Refresh the page and try again.</h2>
    </div>
  );
};

export default App;
