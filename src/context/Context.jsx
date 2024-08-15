import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const baseURL = import.meta.env.VITE_TENDERS;
  const tendersUrl = `${baseURL}/tenders`;

  const getTenders = async () => {
    try {
      const response = await axios.get(tendersUrl);
      setData(response.data ? response.data : []);
    } catch (error) {
      console.error("Fetch data error", error);
    }
  };

  const updateTender = async (id, updatedData) => {
    try {
      await axios.put(`${tendersUrl}/${id}`, updatedData);
      setData(prevTenders =>
        prevTenders.map(tender => (tender.id === id ? updatedData : tender))
      );
    } catch (error) {
      console.error("Update error", error);
    }
  };

  const deleteTender = async (id) => {
    try {
      await axios.delete(`${tendersUrl}/${id}`);
      setData(prevTenders => prevTenders.filter(tender => tender.id !== id));
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  useEffect(() => {
    getTenders();
  }, []);

  return (
    <Context.Provider value={{ data, updateTender, deleteTender }}>
      {children}
    </Context.Provider>
  );
};

export default DataProvider;
