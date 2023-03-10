import React, { createContext, useState } from "react";

interface ContextType {
  mylocation: any[];
  locationData: any[];
  time: any[];
  date: any[];
  curr_Location: any[];
  setLocationData: (data: any) => void;
  setTime: (time: any) => void;
  setDate: (date: any) => void;
  setMyLocation: (location: any) => void;
  setCurrLocation: (location: any) => void;
}

export const Context = createContext<ContextType>({
  mylocation: [],
  locationData: [],
  time: [],
  date: [],
  curr_Location: [],
  setLocationData: (data: any) => {},
  setTime: (time: any) => {},
  setDate: (date: any) => {},
  setMyLocation: (location: any) => {},
  setCurrLocation: (location: any) => {},
});

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [mylocation, setMyLocation] = useState<any[]>([]);
  const [locationData, setLocationData] = useState<any[]>([]);
  const [time, setTime] = useState<any[]>([]);
  const [date, setDate] = useState<any[]>([]);
  const [curr_Location, setCurrLocation] = useState<any[]>([]);

  const contextValue: ContextType = {
    mylocation,
    locationData,
    time,
    date,
    curr_Location,
    setLocationData,
    setTime,
    setDate,
    setCurrLocation,
    setMyLocation,
  };

  return (
    <div>
      <Context.Provider value={contextValue}>{children}</Context.Provider>
    </div>
  );
}

export default ContextProvider;

