import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/HomePage";
import RoulettePage from "../pages/RoulettePage";

const AnimatedRoutes = ({ token }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage token={token} />} />
        <Route
          path="/roulette"
          element={
            <ProtectedRoute token={token}>
              <RoulettePage token={token} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;