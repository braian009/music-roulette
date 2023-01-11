import * as React from "react";
import styled from "styled-components";

const DropdownFilter = ({ genre, optionList, onSelectedOption, start }) => {
  const menuRef = React.useRef(null);
  const toggleRef = React.useRef(null);

  React.useEffect(() => {
    if (menuRef.current && toggleRef.current) {
      menuRef.current.style.setProperty(
        "top",
        `${toggleRef.current.getBoundingClientRect().height}px`
      );
      console.log(toggleRef.current.getBoundingClientRect().height);
      const container = document.querySelector(".dropdown-inner");
      container.style.setProperty(
        "height",
        `${
          menuRef.current.getBoundingClientRect().height +
          toggleRef.current.getBoundingClientRect().height
        }px`
      );

      console.log(menuRef.current.scrollHeight);
    }
  }, []);

  const handleSelected = (option) => {
    if (start) return;

    onSelectedOption(option);
    setIsOpen(false);
    setSelectedOption(option);
  };

  React.useEffect(() => {
    if (start) {
      setIsOpen(false);
    }
  }, [start,])

  const [selectedOption, setSelectedOption] = React.useState(genre);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownFilterContainer>
      <div className={`dropdown-inner ${isOpen ? "open" : ""}`}>
        <button
          className="dropdown-toggle"
          ref={toggleRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
        </button>
        <div className="dropdown-menu" ref={menuRef}>
          <ul>
            {optionList.map((option) => (
              <li key={option} onClick={() => handleSelected(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DropdownFilterContainer>
  );
};

const DropdownFilterContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 30em;
  position: relative;
  margin-top: 1.5em;

  .dropdown-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dropdown-inner.open .dropdown-menu {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
    transition: opacity 0.3s linear 0.3s;
  }

  .dropdown-inner.open .dropdown-toggle {
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.5, 1.2);
    top: 0;
  }

  .dropdown-toggle {
    font-size: 1.15rem;
    padding: 0.5em 0.8em;
    position: relative;
    top: 1.5em;
    background: none;
    line-height: 0.8;
    outline: none;
    color: var(--font-color);
    border: none;
    border-bottom: 1px solid white;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.5, 1.2) 0.3s;
  }

  .dropdown-menu {
    visibility: hidden;
    opacity: 0;
    padding: 0.5em 0;
    transition: visibility 0s linear 0.3s;
    transition: opacity 0.3s linear;

    position: absolute;

    ul {
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: space-between;
      flex-wrap: wrap;
      list-style-type: none;
      transition: all 0.3s ease-out;

      * {
        font-size: 0.8rem;
        background-color: var(--blue-secondary);
        padding: 0.4em 0.7em;
        border: 1px solid var(--blue-secondary);
        color: var(--font-color);
        line-height: 0.8;
        margin-bottom: 0.25em;
        border-radius: 20px;
        transition: all 0.2s linear;
        cursor: pointer;

        &:hover {
          background-color: var(--blue-primary);
          border: 1px solid var(--blue-primary);
        }
      }

      * + * {
        margin-left: 0.25em;
      }
    }
  }
`;

export default DropdownFilter;
