'use client'

import React, {
  FC,
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { Dispatch, SetStateAction } from "react";
import { ExhibitorsDataType } from "@/types/exhibitor";
import ExhibitorsData, {
  notification as NotificationData,
} from "@/data/temporarayData";
import { Notification } from "../types/exhibitor";

type Props = {
  children: ReactNode;
};

type Context = {
  currentUser: ExhibitorsDataType;
  setCurrentUser: Dispatch<SetStateAction<ExhibitorsDataType>>;
  notification: Notification[];
  setNotification: Dispatch<SetStateAction<Notification[]>>;
};

export const PortalContext = createContext<Context | undefined>(undefined);

const ExhibitorPortalContext: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ExhibitorsDataType>(
    ExhibitorsData[0]
  );
  const [notification, setNotification] = useState<Notification[]>([]);

  useEffect(() => {
    const currentUserNotification = NotificationData.filter(
      (note) => note.destionation === currentUser.id
    );
    setNotification(currentUserNotification);
  }, [currentUser]);

  const values = {
    currentUser,
    setCurrentUser,
    notification,
    setNotification,
  };

  return (
    <PortalContext.Provider value={values}>{children}</PortalContext.Provider>
  );
};

export default ExhibitorPortalContext;

export const useExhibitorPortalContext = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error(
      "useExhibitorPortalContext must be used within an ExhibitorPortalContext provider"
    );
  }
  return context;
};
