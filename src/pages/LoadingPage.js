import { ScaleLoader } from "react-spinners";
import styled from "styled-components";
import { motion } from "framer-motion";

const LoadingPage = ({ loading }) => {
  return (
    <LoadingContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="loading-indicator"
      >
        <ScaleLoader
          color="#1db954"
          cssOverride={false}
          height={40}
          width={4}
          loading={loading}
        />
      </motion.div>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .loading-indicator {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top: 12.5em;

    display: flex;
    justify-content: center;

    @media (max-width: 30em) {
      padding-top: 17.5em;
    }
  }
`;

export default LoadingPage;
