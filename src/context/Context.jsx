import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext()

const DataProvider = ({ children }) => {
  const [data, setData] = useState([])
  const baseURL = import.meta.env.VITE_TENDERS
  const tendersUrl = `${baseURL}/tenders`
  
  const getTenders = async () => {
    if (!tendersUrl) {
      console.error('Tenders URL is not defined');
      return;
    }

    try {
      const response = await axios.get(tendersUrl);
      const tendersRes = response.data ? response.data : [];
      setData(tendersRes);
    } catch (error) {
      console.error('Fetch data error', error);
    }
  }

  useEffect(() => {
    getTenders();
  }, []);

  return (
    <Context.Provider value={data}>
      {children}
    </Context.Provider>
  )
}

export default DataProvider;
