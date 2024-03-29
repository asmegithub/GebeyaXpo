"use client";
import React, { useEffect, useState } from "react";
import { Notification } from "@/types/exhibitor";
import { useExhibitorPortalContext } from "@/context/ExhibitorPortalContext";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

type Props = {
  params: {
    id: number;
  };
};

const page = ({ params: { id } }: Props) => {
  const [currentNotificatin, setCurrentNotificatin] =
    useState<Notification | null>();
  const { notification } = useExhibitorPortalContext();

  useEffect(() => {
    if (id) {
      const newNotefication = notification.filter((item) => item.id == id);
      setCurrentNotificatin(newNotefication[0]);
    }
  }, []);

  return (
    <div className=" xs:ml-[130px]  md:ml-[290px] h-screen  flex flex-col justify-center items-center">
      <div className="">
        {currentNotificatin ? (
          <div className=" mt-32 h-[80vh]  w-[80vw] mx-auto  overflow-y-auto flex flex-col gap-5">
            <h3 className=" text-base lg:text-4xl font-bold text-BlueDark  py-5 ">
              {currentNotificatin.title}
            </h3>
            <p className=" text-sm lg:text-base text-gray-600 font-medium max-w-3xl ">
              {currentNotificatin.description}
            </p>
            <Link href={currentNotificatin.link as string}>
              {currentNotificatin.link}
            </Link>
          </div>
        ) : (
          <div className=" h-screen flex flex-col justify-center items-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
