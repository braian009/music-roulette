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
        <Link to='/roulette' className="cta-button">Try it out</Link>
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.section`
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
    font-size: .7rem;
    text-align: center;
    color: #f4f4f4;
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
    padding: .5em 1em;
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
    .home-inner {
      padding: calc(140px + 5vh) 1.5em;

    }
  }


  
`;

export default HomePage;
