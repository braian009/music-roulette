import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingPage from "./LoadingPage";

const HomePage = ({token}) => {

  if (!token) {
    return <LoadingPage loading={true}/>;
  }
  return (
    <HomeContainer>
      <motion.div
        className="home-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1>Music Roulette</h1>
        <hr />
        <p>
          Music roulette allows users to spin a virtual roulette to randomly
          select a song from the genre of choice, each of those genres are based
          on one of its most popular playlists on spotify. Once the track is
          selected, the user can head to the app to give it a try and maybe
          discover a song of his liking.
        </p>
        <Link to="/roulette" className="cta-button">
          Try it out
        </Link>
      </motion.div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  color: var(--white-primary);

  .home-inner {
    padding: 12em 0.5em;

    h1 {
      margin: 0;
      margin-top: 1.5em;
      text-align: center;
    }

    hr {
      border-color: var(--blue-primary);
    }

    p {
      font-size: 0.9em;
      line-height: 1.2;
      text-align: center;
      color: var(--gray-primary);
    }
  }

  @media (min-width: 30em) {
    .home-inner {
      padding: 7em 1.5em;
    }
  }
`;

export default HomePage;
