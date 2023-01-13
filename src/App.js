import * as React from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import AnimatedRoutes from "./components/AnimatedRoutes";

const requestBody = new URLSearchParams();
requestBody.append("grant_type", "client_credentials");
requestBody.append("client_id", "a695753cdff247038297819809107086");
requestBody.append("client_secret", "8ff09201d7af455cbd4b56805b65122d");

const App = () => {

  const [token, setToken] = React.useState("");

  const retrieveToken = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        requestBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = response.data.access_token;
      setToken(accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    retrieveToken();
  }, []);


  return (
    <div className="App">
      <AppContainer>
        <div className="app-background"></div>
        <AnimatedRoutes token={token}/>
      </AppContainer>
    </div>
  );
};

const AppContainer = styled.section`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  min-height: 95vh;

  .app-background {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-image: url(${require("./assets/pagebackground.jpg")});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
    z-index: -10;
    transition: opacity 0.3s linear;
  }
`;

export default App;
