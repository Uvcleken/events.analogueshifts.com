"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface EventsContextType {
  events: any[];
  paginationInfo: any;
  setEvents: (data: any) => void;
  setPaginationInfo: (data: any) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents]: any = useState(null);
  const [paginationInfo, setPaginationInfo]: any = useState(null);

  return (
    <EventsContext.Provider
      value={{ events, setEvents, paginationInfo, setPaginationInfo }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
