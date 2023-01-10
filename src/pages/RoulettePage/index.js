import * as React from "react";
import RoulettePro from "react-roulette-pro";
import styled from "styled-components";
import axios from "axios";
import "react-roulette-pro/dist/index.css";
import DropdownFilter from "../../components/DropdownFilter";

const PLAYLISTS = {
    'techno': {
      name: 'techno bunker',
      id: '37i9dQZF1DX6J5NfMJS675',
    }, 
    'tech house': {
      name: 'operator',
      id: '37i9dQZF1DWVY4eLfA3XFQ',
    },
    'dance': {
      name: 'mint',
      id: '37i9dQZF1DX4dyzvuaRJ0n',
    },
    'dubstep': {
      name: 'dubstep don',
      id: '37i9dQZF1DX5Q27plkaOQ3',
    }
  }

const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill("_")
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}}`;

const getReproducedPrizeList = (items) => {
  return [
    ...items,
    ...reproductionArray(items, items.length * 3),
    ...items,
    ...reproductionArray(items, items.length),
  ];
};

const getPrizeList = (items) => {
  const prizeList = getReproducedPrizeList(items);

  return [
    ...prizeList.map((prize) => ({
      ...prize,
      id: generateId(),
    })),
  ];
};

const extractData = (items) => {
  return items.map((item) => ({
    image: item.track.album.images[1].url,
    title: item.track.name,
    artist: item.track.artists[0].name,
  }));
};

const RoulettePage = ({ token }) => {
  console.log("it renders.");
  const [genre, setGenre] = React.useState('techno');
  let [query, setQuery] = React.useState(PLAYLISTS[genre].id);
  let trackList = React.useRef([]);
  let prizeList = React.useRef([]);
  let prizeIndex = React.useRef(0);

  const [start, setStart] = React.useState(false);
  const [prizeDefined, setPrizeDefined] = React.useState(
    prizeIndex.current ? prizeList.current[prizeIndex.current] : ""
  );
  const [showSelected, setShowSelected] = React.useState(false);

  React.useEffect(() => {
    setQuery(PLAYLISTS[genre].id);
  }, [genre])

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

      try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${query}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response)
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
      } catch (e) {
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
  }

  return (
    <Container>
      {!showSelected && <DropdownFilter genre={genre} onSelectedOption={onSelectedOption} optionList={Object.keys(PLAYLISTS)} />}
      <RouletteContainer>
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
                <button className="cta-button" onClick={handleDismiss}>
                  Ok
                </button>
                <button className="cta-button" onClick={handleDismiss}>
                  Ok
                </button>
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
    </Container>
  );
};

const Container = styled.section`
  padding: 5em 0.5em;

  @media (min-width: 35em) {
    padding: 2.5em 0.5em;
  }
`;

const RouletteContainer = styled.div`
  color: #f8f8f8;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 0.75em;

  .roulette-inner {
    .roulette-pro-regular-prize-item {
      /* width: 200px !important; */
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
    }

    img.roulette-pro-regular-prize-item-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .selected-preview {
      width: 100%;
      height: 100%;

      .selected-options {
        width: 12.5em;
        margin: 0 auto;
        margin-top: 1.5em;
        display: flex;
        flex-direction: column;

        button {
          display: block;
          width: 100%;
          margin-top: 0;
        }

        button:nth-child(2):hover {
          background-color: #007bff;
          border: 1px solid #007bff;
        }

        button + button {
          margin-top: 0.5em;
        }
      }

      h2 {
        font-size: 1.4rem;
        line-height: 0.8;
        margin: 0;
        text-align: center;
      }

      .button-jeje {
        width: 7em;
        margin: 0 auto;
        text-align: center;
        margin-top: 1.5em;
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
          border-radius: 0.5em;
          object-fit: cover;
        }

        .song-card__title {
          line-height: 0.8;
          font-size: 1.1rem;
          margin-top: 0.5em;
        }

        .song-card__author {
          line-height: 0.8;
          font-size: 0.9rem;
          margin-top: 0.5em;
        }
      }
    }
    .cta-button {
      font-size: 0.8rem;
      display: block;
      width: 7em;
      text-align: center;
      margin: 0 auto;
      margin-top: 1.5em;
      color: #f4f4f4;
      background: none;
      padding: 0.5em 1em;
      border: 1px solid #f4f4f4;
      border-radius: 20px;
      outline: none;
      background-color: hsla(0, 0%, 0%, 0.4);

      transition: all 0.2s ease-out;

      box-shadow: 0px 11px 14px black;

      &:hover {
        background-color: #1db954;
        border: 1px solid #1db954;
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
