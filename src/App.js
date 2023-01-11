import * as React from "react";
import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RoulettePage from "./pages/RoulettePage";
import ProtectedRoute from "./components/ProtectedRoute";

const requestBody = new URLSearchParams();
requestBody.append("grant_type", "client_credentials");
requestBody.append("client_id", "a695753cdff247038297819809107086");
requestBody.append("client_secret", "8ff09201d7af455cbd4b56805b65122d");

const App = () => {

  console.log('renderiza')
  const [token, setToken] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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
      console.log(accessToken);
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/roulette"
            element={
              <ProtectedRoute token={token}>
                <RoulettePage token={token} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
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
    z-index: -10;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.5;
    transition: opacity 0.3s linear;
  }
`;

export default App;
