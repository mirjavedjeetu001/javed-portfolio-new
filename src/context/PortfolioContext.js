import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/client";

const PortfolioContext = createContext({
  data: null,
  loading: true,
  error: null,
  refresh: () => {},
});

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/public/portfolio");
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({ data, loading, error, refresh: fetchData }),
    [data, loading, error, fetchData]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export default PortfolioContext;
