import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <HomeContainer>
      <div className="home-inner">
        <h1>Music Roulette</h1>
        <hr />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia a
          ullam praesentium. Laudantium sunt cumque magnam officia inventore
          quia eos, obcaecati quo dolores pariatur ducimus.
        </p>
        <Link to="/roulette" className="cta-button">
          Try it out
        </Link>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  color: #f8f8f8;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .home-inner {
    padding: 12em 0.5em;

    h1 {
      margin: 0;
      margin-top: 1.5em;
      text-align: center;
    }

    p {
      font-size: 0.7rem;
      text-align: center;
      color: #f4f4f4;
    }

    .cta-button {
      font-size: 0.9rem;
      display: block;
      width: 7em;
      text-align: center;
      margin: 0 auto;
      margin-top: 1.5em;
      color: #f4f4f4;
      background: var(--green-secondary);
      padding: 0.5em 1em;
      border: 1px solid var(--green-secondary);
      border-radius: 20px;
      outline: none;

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

  @media (min-width: 30em) {
    .home-inner {
      padding: 7em 1.5em;
    }
  }
`;

export default HomePage;
