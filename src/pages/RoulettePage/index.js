import * as React from "react";
import RoulettePro from "react-roulette-pro";
import styled from "styled-components";
import axios from "axios";
import "react-roulette-pro/dist/index.css";
import DropdownFilter from "../../components/DropdownFilter";
import getPrizeList from "./functions/getPrizeList";
import extractData from "./functions/extractData";
import PLAYLISTS from "./playlist";

const RoulettePage = ({ token }) => {
  console.log("it renders.");
  const [genre, setGenre] = React.useState("techno");
  let [query, setQuery] = React.useState(PLAYLISTS[genre].id);
  let trackList = React.useRef([]);
  let prizeList = React.useRef([]);
  let prizeIndex = React.useRef(0);
  const [start, setStart] = React.useState(false);
  const [prizeDefined, setPrizeDefined] = React.useState(
    prizeIndex.current ? prizeList.current[prizeIndex.current] : ""
  );
  const [showSelected, setShowSelected] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
      console.log("entra en el retrieve");
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

        console.log(response);
        const data = await extractData(response.data.items.slice(0, 20));

        trackList.current = [...data];

        const prizes = getPrizeList(trackList.current);
        prizeList.current = [...prizes];

        prizeIndex.current = Math.floor(
          Math.random() *
            (prizeList.current.length - trackList.current.length * 4) +
            trackList.current.length * 4
        );
        setPrizeDefined(prizeList.current[prizeIndex.current]);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false)
        console.log("error aca");
        console.log(e);
      }
    };

    retrieveTracks(query);
  }, [query]);

  const handleStart = () => {
    setStart(!start);
  };

  const handlePrizeDefined = () => {
    console.log("prize defined");
    setShowSelected(true);
  };

  const handleDismiss = () => {
    prizeIndex.current = Math.floor(
      Math.random() *
        (prizeList.current.length - trackList.current.length * 4) +
        trackList.current.length * 4
    );
    setShowSelected(false);
    setStart(false);
  };

  const onSelectedOption = (option) => {
    setGenre(option);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <RouletteContainer>
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
          <div className="selected-preview">
            <h2>Your song for this moment is:</h2>
            <div className="song-card">
              <img
                className="song-card__cover"
                src={prizeDefined.image}
                alt="song cover"
              />
              <div className="song-card__title">{prizeDefined.title}</div>
              <div className="song-card__author">({prizeDefined.artist})</div>
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
          </div>
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

  .roulette-inner {
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
      border: 2px solid #f5f5f5;
      border-radius: .7em;

    }

    img.roulette-pro-regular-prize-item-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .selected-preview {
      width: 100%;
      max-width: 520px;
      margin: 0 auto;
      border-radius: 0.7em;
      padding: 2em 2em;
      /* background-image: linear-gradient(to top, hsla(0, 0%, 0%, 0.4), transparent); */
      background-color: hsla(0, 0%, 0%, 0.5);
      border: 1px solid hsl(22deg 50% 57%);

      .selected-options {
        width: 12.5em;
        margin: 0 auto;
        margin-top: 1.5em;
        display: flex;
        flex-direction: column;

        .cta-button {
          display: block;
          width: 10em;
          margin-top: 0;
          cursor: pointer;

          &:hover {
            width: 100%;
            transform: scale(1);
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
        font-weight: lighter;
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
          border-radius: 0.7em;
          object-fit: cover;
          border: 1px solid hsl(22deg 100% 57%);
          transition: all 0.2s ease-out;

          &:hover {
            transform: scale(1.01);
            /* border: 1px solid transparent; */
          }
        }

        .song-card__title {
          text-align: center;
          line-height: 1;
          letter-spacing: 0.04em;
          font-size: 1.1rem;
          margin-top: 0.5em;
          max-width: 12.5em;
        }

        .song-card__author {
          text-align: center;

          line-height: 0.8;
          font-size: 0.9rem;
          margin-top: 0.5em;
          color: var(--font-color);
          max-width: 12.5em;
        }
      }
    }
    .cta-button {
      font-size: 0.9rem;
      display: block;
      width: 7em;
      text-align: center;
      margin: 0 auto;
      margin-top: 1em;
      color: #f4f4f4;
      background: var(--green-secondary);
      padding: 0.5em 1em;
      border: 1px solid var(--green-secondary);
      border-radius: 20px;
      outline: none;
      cursor: pointer;

      /* box-shadow: 4px 4px 22px #f4f4f4; */

      transition: all 0.2s ease-out;

      &:hover,
      &:focus {
        background-color: var(--green-primary);
        border: 1px solid var(--green-primary);
        transform: scale(1.05);
      }
    }
  }

  /* 
  @media (min-width: 50em) {
    .roulette-inner {
      padding: 220px 2.5em;
    }
  } */
`;

export default RoulettePage;
