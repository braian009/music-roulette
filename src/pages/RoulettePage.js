import * as React from "react";
import RoulettePro from "react-roulette-pro";
import styled from "styled-components";
import "react-roulette-pro/dist/index.css";

const images = [
  {
    image: require("../assets/covers/chrislake1.png"),
  },
  {
    image: require("../assets/covers/chrislake2.jpg"),
  },
  {
    image: require("../assets/covers/chrislake3.jpg"),
  },
  {
    image: require("../assets/covers/chrislake4.jpg"),
  },
  {
    image: require("../assets/covers/chrislake5.jpg"),
  },
];

const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill("_")
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const reproducedPrizeList = [
  ...images,
  ...reproductionArray(images, images.length * 3),
  ...images,
  ...reproductionArray(images, images.length),
];

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}}`;

const prizeList = reproducedPrizeList.map((prize) => ({
  ...prize,
  id: generateId(),
}));

const RoulettePage = () => {
  console.log("it renders.");

  let prizeIndex = React.useRef(
    Math.floor(
      Math.random() * (prizeList.length - images.length * 4) + images.length * 4
    )
  );

  const [start, setStart] = React.useState(false);
  const [prizeDefined, setPrizeDefined] = React.useState({
    isDefined: false,
    element: prizeList[prizeIndex.current].image,
  });


  React.useEffect(() => {
    const background = document.querySelector(".app-background");
    background.style.opacity = "0.3";
  }, []);

  const handleStart = () => {
    setStart(!start);
  };

  const handlePrizeDefined = () => {
    console.log("prize defined");
    setPrizeDefined({
      ...prizeDefined,
      isDefined: true,
    });
  };

  const handleDismiss = () => {
    setPrizeDefined({ ...prizeDefined, isDefined: false });
    setStart(false);

    prizeIndex.current = Math.floor(
      Math.random() * (prizeList.length - images.length * 4) + images.length * 4
    );
  };

  return (
    <RouletteContainer>
      <div className="roulette-inner">
        {prizeDefined.isDefined ? (
          <div className="selected-preview">
            <h2>Your song for this moment is:</h2>
            <div className="selected-preview__img">
              <div
                className="cover"
                style={{
                  backgroundImage: `url(${
                    prizeList[prizeIndex.current].image
                  })`,
                }}
              ></div>
            </div>
            <div className="button-jeje" onClick={handleDismiss}>
              Ok
            </div>
          </div>
        ) : (
          <>
            <RoulettePro
              prizes={prizeList}
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

const RouletteContainer = styled.section`
  color: #f8f8f8;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .roulette-inner {
    padding: 12em 0.5em;

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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .selected-preview__img {
        width: 200px;
        height: 200px;
        border: 2px solid #f5f5f5;
      }
      .cover {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
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

  @media (min-width: 35em) {
    .roulette-inner {
      padding: calc(140px + 5vh) 1.5em;
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
