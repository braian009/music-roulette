import * as React from "react";

import axios from "axios";
import styled from "styled-components";
import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";
import { motion } from "framer-motion";

import DropdownFilter from "../../components/DropdownFilter";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";

import getPrizeList from "./functions/getPrizeList";
import extractData from "./functions/extractData";
import PLAYLISTS from "./playlists";

const RoulettePage = ({ token }) => {

  const [genre, setGenre] = React.useState("techno");
  const [query, setQuery] = React.useState(PLAYLISTS[genre].id);
  let trackList = React.useRef([]);
  let prizeList = React.useRef([]);
  let prizeIndex = React.useRef(0);
  const [start, setStart] = React.useState(false);
  const [prizeDefined, setPrizeDefined] = React.useState(
    prizeIndex.current ? prizeList.current[prizeIndex.current] : ""
  );
  const [showSelected, setShowSelected] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setQuery(PLAYLISTS[genre].id);
  }, [genre]);

  React.useEffect(() => {
    const background = document.querySelector(".app-background");
    background.style.opacity = "0.3";
  }, []);

  React.useEffect(() => {
    setPrizeDefined(prizeList.current[prizeIndex.current]);
  }, [prizeIndex.current]);

  React.useEffect(() => {
    const retrieveTracks = async (query) => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${query}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await extractData(response.data.items.slice(0, 30));

        trackList.current = [...data];
        const prizes = getPrizeList(trackList.current);
        prizeList.current = [...prizes];

        prizeIndex.current = Math.floor(
          Math.random() *
            ((prizeList.current.length - 5) - trackList.current.length * 2) +
            trackList.current.length * 2
        );
        setPrizeDefined(prizeList.current[prizeIndex.current]);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsError(true);
        setIsLoading(false);
      }
    };
    retrieveTracks(query);
  }, [query]);

  const handleStart = () => {
    setStart(!start);
  };

  const handlePrizeDefined = () => {
    setShowSelected(true);
  };

  const handleDismiss = () => {
    prizeIndex.current = Math.floor(
      Math.random() *
        ((prizeList.current.length - 5) - trackList.current.length * 2) +
        trackList.current.length * 2
    );
    setShowSelected(false);
    setStart(false);
  };

  const onSelectedOption = (option) => {
    setGenre(option);
  };

  if (isLoading) {
    return <LoadingPage loading={isLoading} />;
  }

  if (isError) {
    return <ErrorPage/>;
  }

  return (
    <RouletteContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="roulette-outer"
      >
        {!showSelected && (
          <DropdownFilter
            start={start}
            genre={genre}
            onSelectedOption={onSelectedOption}
            optionList={Object.keys(PLAYLISTS)}
          />
        )}
        <div className="roulette-inner">
          {showSelected ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="selected-preview"
            >
              <h2>Your song for this moment is:</h2>
              <div className="song-card">
                <img
                  className="song-card__cover"
                  src={prizeDefined.image}
                  alt="song cover"
                />
                <div className="song-card__title">{prizeDefined.title}</div>
                <div className="song-card__author">{prizeDefined.artist}</div>
              </div>
              <div className="selected-options">
                <a
                  className="cta-button"
                  onClick={handleDismiss}
                  href={prizeDefined.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Listen on Spotify
                </a>
                <div className="cta-button" onClick={handleDismiss}>
                  Dismiss
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <RoulettePro
                prizes={prizeList.current}
                prizeIndex={prizeIndex.current}
                start={start}
                onPrizeDefined={handlePrizeDefined}
                spinningTime={3}
                options={{ stopInCenter: false, withoutAnimation: true }}
              />
              <button className="cta-button" onClick={handleStart}>
                Spin
              </button>
            </>
          )}
        </div>
      </motion.div>
    </RouletteContainer>
  );
};

const RouletteContainer = styled.div`
  color: #f8f8f8;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 2.5em 0.5em;

  @media (max-width: 30em) {
    padding-top: 5em;
  }

  .roulette-outer {
    .roulette-pro-regular-prize-item {
      height: 205px !important;
    }

    .roulette-pro-regular-prize-item-wrapper {
      height: 100% !important;
      background: none !important;
      border: 2px solid transparent;
    }

    .roulette-pro-regular-image-wrapper {
      height: 100% !important;
      border: 2px solid var(--gray-primary);
      border-radius: 0.7em;
    }

    img.roulette-pro-regular-prize-item-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .roulette-inner {
      margin-top: 0.25em;
    }

    .selected-preview {
      width: 100%;
      max-width: 520px;
      margin: 0 auto;
      padding: 1.5em 1.5em;
      background-color: hsla(0, 0%, 0%, 0.5);
      border: 1px solid var(--orange-primary);
      border-radius: 1em;

      .selected-options {
        width: 12.5em;
        margin: 0 auto;
        margin-top: 1.5em;
        display: flex;
        flex-direction: column;

        .cta-button {
          width: 11em;
          margin-top: 0;
          cursor: pointer;

          &:hover {
            width: 100%;
            transform: none;
          }
        }

        .cta-button:nth-child(2) {
          background-color: var(--blue-secondary);
          border: 1px solid var(--blue-secondary);

          &:hover {
            background-color: var(--blue-primary);
            border: 1px solid var(--blue-primary);
          }
        }

        .cta-button + .cta-button {
          margin-top: 0.5em;
        }
      }

      h2 {
        font-size: 1.2rem;
        line-height: 0.8;
        font-weight: light;
        margin: 0;
        text-align: center;
      }

      .song-card {
        margin: 0 auto;
        margin-top: 1.5em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .song-card__cover {
          margin: 0 auto;
          width: 12.5em;
          height: 12.5em;
          border-radius: 1em;
          object-fit: cover;
          border: 1px solid hsl(22deg 50% 57%);
          transition: all 0.2s ease-out;

          &:hover {
            transform: scale(1.02);
          }
        }

        .song-card__title {
          text-align: center;
          line-height: 1;
          letter-spacing: 0.03em;
          font-size: 1.1em;
          margin-top: 0.5em;
          max-width: 12.5em;
        }

        .song-card__author {
          font-size: 0.9em;
          text-align: center;
          letter-spacing: 0.03em;
          line-height: 0.8;
          margin-top: 0.5em;
          color: var(--gray-primary);
          max-width: 12.5em;
        }
      }
    }
  }
`;

export default RoulettePage;
