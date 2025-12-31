import { useContext } from "react";
import PortfolioContext from "../context/PortfolioContext";

function usePortfolio() {
  return useContext(PortfolioContext);
}

export default usePortfolio;
