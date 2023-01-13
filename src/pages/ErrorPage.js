import styled from "styled-components";
import { motion } from "framer-motion";

const ErrorPage = ({ loading }) => {
  return (
    <ErrorContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="error-msg"
      >
        <h2>Sorry, somethig went wrong...</h2>
        <p>Try refreshing the page or checking your internet connection.</p>
      </motion.div>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 12.5em;

  .error-msg {
    h2 {
      text-align: center;
      margin: 0;
      color: var(--white-primary);
    }
    p {
      line-height: 1.1;
      text-align: center;
      margin-top: 0.5em;
      color: var(--gray-primary);
    }
  }

  @media (max-width: 30em) {
    padding-top: 17.5em;
  }
`;

export default ErrorPage;
