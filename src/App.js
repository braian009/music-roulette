import "./App.css";
import styled from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RoulettePage from "./pages/RoulettePage";

const App = () => {
  return (
    <div className="App">
      <AppContainer>
        <div className="app-background"></div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roulette" element={<RoulettePage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppContainer>
    </div>
  );
};

const AppContainer = styled.div`

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
